import torch
from datasets import (
    load_dataset,
    DatasetDict,
    concatenate_datasets,
    ClassLabel,
    Features,
    Image,
    Value,
)
from transformers import (  AutoImageProcessor,AutoModelForImageClassification,TrainingArguments,Trainer,)
from transformers.training_args import TrainingArguments
import evaluate
import numpy as np
from PIL import Image as PILImage
from collections import Counter

import transformers
print(transformers.__file__)
print(transformers.__version__)
# Device setup
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using device: {device}")

# Load Food-101 from Hugging Face 
food101_dataset = load_dataset("food101")
food_labels = food101_dataset["train"].features["label"].names
num_food_labels = len(food_labels)
print("Num food labels:", num_food_labels)

#
fruits_dir = "fruits-360"

# Load fruits splits (expects folders 'train' and 'test' under fruits-360)
fruits_ds = load_dataset(
    "imagefolder",
    data_dir=fruits_dir,
    split={"train": "train", "test": "test"}
)

print(" fruits label feature:", fruits_ds["train"].features["label"])

# Force label -> int (and image -> Image) to avoid ClassLabel enforcement while remapping
forced_features = Features({"image": Image(), "label": Value("int64")})
fruits_ds["train"] = fruits_ds["train"].cast(forced_features)
fruits_ds["test"] = fruits_ds["test"].cast(forced_features)
print("After cast to int, fruits label feature:", fruits_ds["train"].features["label"])

# Reconstruct fruit class names using a fresh lightweight load of the training folder
tmp = load_dataset("imagefolder", data_dir=f"{fruits_dir}/train", split="train")
fruits_label_names = tmp.features["label"].names
del tmp
num_fruit_labels = len(fruits_label_names)
print("Fruit class names count:", num_fruit_labels)

# Apply numeric offset safely (column is plain int now)
offset = num_food_labels
def offset_labels(example):
    example["label"] = example["label"] + offset
    return example

# map with cache disabled to avoid stale cache conflicts
fruits_ds["train"] = fruits_ds["train"].map(offset_labels, load_from_cache_file=False)
fruits_ds["test"] = fruits_ds["test"].map(offset_labels, load_from_cache_file=False)

# Cast back to combined ClassLabel with names = food + fruit names
all_labels = food_labels + fruits_label_names
num_labels = len(all_labels)

# Ensure Food-101 label column has the same ClassLabel as fruits+food combined 
food101_dataset["train"] = food101_dataset["train"].cast_column(
    "label", ClassLabel(num_classes=num_labels, names=all_labels)
)
food101_dataset["validation"] = food101_dataset["validation"].cast_column(
    "label", ClassLabel(num_classes=num_labels, names=all_labels)
)

fruits_ds["train"] = fruits_ds["train"].cast_column(
    "label", ClassLabel(num_classes=num_labels, names=all_labels)
)
fruits_ds["test"] = fruits_ds["test"].cast_column(
    "label", ClassLabel(num_classes=num_labels, names=all_labels)
)

print("After final cast, fruits label feature:", fruits_ds["train"].features["label"])

# Merge datasets 
merged_train = concatenate_datasets([food101_dataset["train"], fruits_ds["train"]])
merged_test = concatenate_datasets([food101_dataset["validation"], fruits_ds["test"]])
merged_ds = DatasetDict({"train": merged_train, "test": merged_test})
print("Merged dataset:", merged_ds)
print("Total classes:", num_labels)

# Quick sanity checks
print("Sample merged labels (first 6):")
for i in range(6):
    idx = merged_ds["train"][i]["label"]
    print(f"sample {i} -> idx {idx} name: {all_labels[idx]}")

# Show a few most common labels in merged train
#cnts = Counter(merged_ds["train"]["label"])
#print("Top 10 most common label indices in merged train:", cnts.most_common(10))

#  Load pretrained model with expanded head 
model_name = "nateraw/food"
processor = AutoImageProcessor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(
    model_name,
    num_labels=num_labels,
    ignore_mismatched_sizes=True,  # expand classifier head
)
model.to(device)

# Ensure model config knows human-readable labels
model.config.id2label = {i: name for i, name in enumerate(all_labels)}
model.config.label2id = {name: i for i, name in enumerate(all_labels)}

#  Preprocessing function (used with with_transform) 
def transform(example_batch):
    # keep PIL import name different to avoid shadowing
    images = [im.convert("RGB") for im in example_batch["image"]]
    inputs = processor(images, return_tensors="pt")
    inputs["labels"] = example_batch["label"]
    return inputs

prepared_ds = merged_ds.with_transform(transform)

#  Metrics
metric = evaluate.load("accuracy")
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return metric.compute(predictions=preds, references=labels)

#  TrainingArguments 
training_args = TrainingArguments(
    output_dir="./food101_plus_fruits360_model",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    learning_rate=5e-5,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=20,
    save_strategy="epoch",
    eval_strategy="epoch",  # safe on this import
    remove_unused_columns=False,
    fp16=False,  # MPS doesn't support FP16 reliably
    push_to_hub=False,
)

#  Data collator for Trainer
def collate_fn(batch):
    # Each item in batch is a dict with 'pixel_values' and 'labels'
    pixel_values = torch.stack([x["pixel_values"].squeeze(0) for x in batch]).to(device)
    labels = torch.tensor([x["labels"] for x in batch]).to(device)
    return {"pixel_values": pixel_values, "labels": labels}

# Trainer 
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=prepared_ds["train"],
    eval_dataset=prepared_ds["test"],
    tokenizer=processor,
    compute_metrics=compute_metrics,
    data_collator=collate_fn,
)

# Train
trainer.train()

# Save model and processor 
trainer.save_model("./food101_plus_fruits360_model")
processor.save_pretrained("./food101_plus_fruits360_model")
print("Fine-tuning complete. Model saved to ./food101_plus_fruits360_model")
