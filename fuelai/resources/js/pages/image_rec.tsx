import { Head, useForm, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState, ChangeEvent, DragEvent } from 'react';
import DeepThinkButton from '@/components/deep-think-button';
import { useFileToDataURL } from '@/hooks/use-file-to-data-url';

//TO DO: save the response from llm to DB 

interface Prediction {
    label: string;
    confidence: number;
}

interface ApiResponse {
    predictions?: Prediction[];
    error?: string;
}

interface MealData {
    title: string;
    description: string;
    instructions: string;
    calories: number;
    protein: number;
    carb: number;
    fat: number;
    fiber?: number;
    sugar?: number;
}

export default function ImageRecognition() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [mealForm, setMealForm] = useState<MealData | null>(null);
    const [llmLoading, setLlmLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [deepThinkState, setDeepThinkState] = useState(false);
    const { dataURL, convert, loading: convertLoading, error: convertError } = useFileToDataURL(); // fixes jpg issues

    // can still keep useForm for other pages/consistency
    const { errors, reset } = useForm({
        name: '',
        description: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: '',
        sugar: '',
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setSelectedFile(file);
        if (file) setPreviewUrl(URL.createObjectURL(file));
        setApiResponse(null);
        setMealForm(null);
        setSelectedLabel(null);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] ?? null;
        setSelectedFile(file);
        if (file) setPreviewUrl(URL.createObjectURL(file));
        setApiResponse(null);
        setMealForm(null);
        setSelectedLabel(null);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleAnalyzeImage = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setApiResponse(null);
        setMealForm(null);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("https://web-production-c0e3d.up.railway.app/predict_food", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setApiResponse(data);
        } catch (err) {
            console.error(err);
            setApiResponse({ error: "Error processing image" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeeopThink = async (img: File | null) => {
  if (!img) {
    setError("No image selected for Deep Think.");
    return;
  }

  setLlmLoading(true);
  setError(null);

  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("Missing OpenRouter API key");

    // Convert image to base64
const base64Image = await convert(img);

    const prompt = `
You are an expert nutritionist and chef.
Analyze the attached food image and generate structured JSON describing the meal and its nutritional breakdown.
Respond ONLY in this JSON structure:
{
  "meal": {
    "title": "String",
    "description": "String",
    "instructions": "String"
  },
  "nutrition": {
    "calories": number,
    "protein": number,
    "carb": number,
    "fat": number,
    "fiber": number,
    "sugar": number
  }
}`;
console.log("Sending to OpenRouter:", {
  model: "openai/gpt-4o",
  hasImagePrefix: base64Image.startsWith("data:image/"),
  length: base64Image.length,
});

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o", //  Use a vision-capable model
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: base64Image },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) throw new Error("No content returned from LLM");

    const cleanJson = rawContent.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    setMealForm({
      title: parsed.meal.title,
      description: parsed.meal.description,
      instructions: parsed.meal.instructions,
      calories: parsed.nutrition.calories,
      protein: parsed.nutrition.protein,
      carb: parsed.nutrition.carb,
      fat: parsed.nutrition.fat,
      fiber: parsed.nutrition.fiber,
      sugar: parsed.nutrition.sugar,
    });
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Error processing image");
  } finally {
    setLlmLoading(false);
  }
};

   

    const fetchMealDataFromLLM = async (label: string) => {
        setLlmLoading(true);
        setError(null);

        try {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
            if (!apiKey) throw new Error("Missing OpenRouter API key");

            const prompt = `
Given the food item "${label}", return structured JSON describing the meal and nutritional breakdown.

Respond ONLY in JSON with this structure:

{
  "meal": {
    "title": "String",
    "description": "String",
    "instructions": "String"
  },
  "nutrition": {
    "calories": number,
    "protein": number,
    "carb": number,
    "fat": number,
    "fiber": number,
    "sugar": number
  }
}
`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o-mini",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                    max_tokens: 1000,
                }),
            });

            const data = await response.json();

            const rawContent = data.choices?.[0]?.message?.content;
            if (!rawContent) throw new Error("No content returned from LLM");

            // Remove any accidental code fences like ```json
            const cleanJson = rawContent.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(cleanJson);

            setMealForm({
                title: parsed.meal.title,
                description: parsed.meal.description,
                instructions: parsed.meal.instructions,
                calories: parsed.nutrition.calories,
                protein: parsed.nutrition.protein,
                carb: parsed.nutrition.carb,
                fat: parsed.nutrition.fat,
                fiber: parsed.nutrition.fiber,
                sugar: parsed.nutrition.sugar,
            });
        } catch (err: any) {
            console.error("LLM error:", err);
            setError(err.message || "Failed to retrieve meal data.");
        } finally {
            setLlmLoading(false);
        }
    };
    

    const handleClear = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setApiResponse(null);
        setSelectedLabel(null);
        setMealForm(null);
        reset();
    };

    const handleMealChange = (field: keyof MealData, value: any) => {
        if (mealForm) {
            setMealForm({ ...mealForm, [field]: value });
        }
    };

    
    const handleSaveMeal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mealForm) return;

        setSaving(true);

        // Map to your controller's expected fields
        const payload = {
            name: mealForm.title,
            description: mealForm.description,
            // NutritionalInfo fields (controller expects numeric)
            calories: mealForm.calories,
            protein: mealForm.protein,
            carbs: mealForm.carb,
            fat: mealForm.fat,
            fiber: mealForm.fiber ?? 0,
            sugar: mealForm.sugar ?? 0,
            sodium: 0, // placeholder since LLM doesn’t generate this yet
            other_nutrients: '',
        };

        router.post('/image_rec', payload, {
            onSuccess: () => {
                setSaving(false);
                reset();
                // optional: clear UI
                // handleClear();
                alert('Meal saved successfully!');
            },
            onError: (errs) => {
                console.error('Save failed:', errs);
                setSaving(false);
            },
            preserveScroll: true,
        });
    };
    


    return (
        <>
            <Head title="Quick Food Log" />
            <NavbarTop />

            <div className="max-w-3xl mx-auto p-6 pt-70">
                <h1 className="text-4xl font-bold mb-2 text-center">Fuel Recognition</h1>
                <p className="text-center text-base-content/70 mb-6">
                    Upload a meal photo and let AI recognize and populate your food log automatically!
                </p>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-primary rounded-lg p-4 text-center cursor-pointer bg-base-100 hover:bg-base-200 transition-colors mb-4"
                >
                    <p className="mb-2 text-sm text-base-content/70">
                        Drag & drop a photo of your food, or click below to select one.
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full max-w-xs mx-auto mt-2"
                    />
                </div>

                {previewUrl && (
                    <div className="mb-4 flex flex-col items-center">
                        <img src={previewUrl} alt="Preview" className="max-w-xs rounded border mb-4" />
                        <div className="flex gap-4">
                            <button
                                onClick={handleAnalyzeImage}
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? "Analyzing..." : "Recognize Food"}
                            </button>
                            <button onClick={handleClear} className="btn btn-secondary">
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {apiResponse?.predictions && (
                    <div className="mt-6 bg-base-200 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2 text-center">Top 5 Predictions</h2>
                        <ul className="space-y-2">
                            {apiResponse.predictions.slice(0, 5).map((pred, index) => (
                                <li
                                    key={index}
                                    className={`p-3 rounded cursor-pointer border ${selectedLabel === pred.label
                                        ? "bg-primary text-primary-content"
                                        : "hover:bg-base-300"
                                        }`}
                                    onClick={() => {
                                        setSelectedLabel(pred.label);
                                        fetchMealDataFromLLM(pred.label);
                                    }}
                                >
                                    {pred.label} — {(pred.confidence * 100).toFixed(2)}%
                                    

                                </li>
                            ))}
                        </ul>
                        <DeepThinkButton onClick={() => handleDeeopThink(selectedFile)} disabled={!selectedFile} loading={llmLoading} />
                    </div>
                )}

                {llmLoading && (
                    <div className="text-center mt-4">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-2">Generating meal details...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error mt-4">
                        <span>{error}</span>
                    </div>
                )}

                {mealForm && (
                    <div className="mt-8 p-6 bg-base-200 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Review & Edit Meal
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(
                                [
                                    ["title", "Title"],
                                    ["calories", "Calories"],
                                    ["protein", "Protein (g)"],
                                    ["carb", "Carbs (g)"],
                                    ["fat", "Fat (g)"],
                                    ["fiber", "Fiber (g)"],
                                    ["sugar", "Sugar (g)"],
                                ] as [keyof MealData, string][]
                            ).map(([field, label]) => (
                                <label key={field} className="form-control">
                                    <span className="label-text font-semibold">{label}</span>
                                    <input
                                        type={["title"].includes(field) ? "text" : "number"}
                                        className="input input-bordered"
                                        value={(mealForm[field] as string | number) ?? ""}
                                        onChange={(e) =>
                                            handleMealChange(
                                                field,
                                                ["title"].includes(field)
                                                    ? e.target.value
                                                    : e.target.value === ""
                                                        ? ""
                                                        : Number(e.target.value)
                                            )
                                        }
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {[
                                ["description", "Description"],
                                ["instructions", "Instructions"],
                            ].map(([field, label]) => (
                                <div key={field} className="flex flex-col">
                                    <span className="text-center font-semibold mb-2 text-lg">
                                        {label}
                                    </span>
                                    <textarea
                                        className="textarea textarea-bordered resize-none overflow-hidden bg-base-100 
                                   focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
                                        rows={4}
                                        value={mealForm[field as "description" | "instructions"]}
                                        placeholder={`Enter ${label.toLowerCase()}...`}
                                        onChange={(e) => {
                                            handleMealChange(field as keyof MealData, e.target.value);
                                            const textarea = e.target;
                                            textarea.style.height = "auto";
                                            textarea.style.height = `${textarea.scrollHeight}px`;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                className="btn btn-primary"
                                onClick={handleSaveMeal}
                                disabled={saving}
                                type="button"
                            >
                                {saving ? 'Saving…' : 'Save Meal'}
                            </button>
                            <button onClick={handleClear} className="btn btn-secondary" type="button">
                                Clear
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}










