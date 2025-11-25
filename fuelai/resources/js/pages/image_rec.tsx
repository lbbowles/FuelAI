import { Head, useForm, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState, ChangeEvent, DragEvent } from 'react';
import DeepThinkButton from '@/components/deep-think-button';
import { useFileToDataURL } from '@/hooks/use-file-to-data-url';

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
    instruction: string;   // ← singular
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
    const { convert } = useFileToDataURL();

    const { reset } = useForm({
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

            const base64Image = await convert(img);

            const prompt = `
                You are an expert nutritionist and chef.
                Analyze the attached food image and return ONLY valid JSON.

                {
                  "meal": {
                    "title": "String",
                    "description": "String",
                    "instruction": "String"
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

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o",
                    response_format: { type: "json_object" },
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
            const parsed = JSON.parse(data.choices?.[0]?.message?.content);

            setMealForm({
                title: parsed.meal.title,
                description: parsed.meal.description,
                instruction: parsed.meal.instruction,
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

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o-mini",
                    response_format: { type: "json_object" }, // STRICT JSON
                    messages: [
                        {
                            role: "user",
                            content: `
Given the food item "${label}", respond ONLY with JSON:

{
  "meal": {
    "title": "String",
    "description": "String",
    "instruction": "String"
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
`
                        }
                    ],
                    temperature: 0.7,
                }),
            });

            const data = await response.json();
            const parsed = JSON.parse(data.choices?.[0]?.message?.content);

            setMealForm({
                title: parsed.meal.title,
                description: parsed.meal.description,
                instruction: parsed.meal.instruction,
                calories: parsed.nutrition.calories,
                protein: parsed.nutrition.protein,
                carb: parsed.nutrition.carb,
                fat: parsed.nutrition.fat,
                fiber: parsed.nutrition.fiber,
                sugar: parsed.nutrition.sugar,
            });
        } catch (err: any) {
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
        if (mealForm) setMealForm({ ...mealForm, [field]: value });
    };


    const handleSaveMeal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mealForm || !selectedFile) return;

        setSaving(true);

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", mealForm.title);
        formData.append("description", mealForm.description);
        formData.append("instruction", mealForm.instruction);   // FIXED HERE ✔
        formData.append("calories", String(mealForm.calories));
        formData.append("protein", String(mealForm.protein));
        formData.append("carbs", String(mealForm.carb));
        formData.append("fat", String(mealForm.fat));
        formData.append("fiber", String(mealForm.fiber ?? 0));
        formData.append("sugar", String(mealForm.sugar ?? 0));
        formData.append("sodium", "0");
        formData.append("other_nutrients", "");

        router.post('/image_rec', formData, {
            forceFormData: true,
            onSuccess: () => {
                setSaving(false);
                reset();
                alert("Meal saved successfully!");
            },
            onError: () => setSaving(false),
        });
    };


    return (
        <>
            <Head title="Quick Food Log" />
            <NavbarTop />

            <div className="max-w-3xl mx-auto p-6 pt-48">

                <h1 className="text-4xl font-bold text-center mb-4">Fuel Recognition</h1>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-primary rounded-lg p-4 text-center cursor-pointer bg-base-100 hover:bg-base-200 transition-colors mb-4"
                >
                    <p className="mb-2 text-sm text-base-content/70">
                        Drag & drop a photo of your food, or select one below.
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full max-w-xs mx-auto mt-2"
                    />
                </div>

                {previewUrl && (
                    <div className="mb-6 text-center">
                        <img src={previewUrl} alt="Preview" className="max-w-xs mx-auto rounded border mb-4" />

                        <div className="flex justify-center gap-4">
                            <button onClick={handleAnalyzeImage} className="btn btn-primary">
                                {loading ? "Analyzing…" : "Recognize Food"}
                            </button>
                            <button onClick={handleClear} className="btn btn-secondary">
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {apiResponse?.predictions && (
                    <div className="bg-base-200 p-4 rounded shadow mb-6">
                        <h2 className="text-xl font-semibold text-center mb-2">Top Predictions</h2>

                        <ul className="space-y-2">
                            {apiResponse.predictions.slice(0, 5).map((pred, idx) => (
                                <li
                                    key={idx}
                                    className={`p-3 rounded cursor-pointer border ${
                                        selectedLabel === pred.label
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

                        <DeepThinkButton
                            onClick={() => handleDeeopThink(selectedFile)}
                            disabled={!selectedFile}
                            loading={llmLoading}
                        />
                    </div>
                )}

                {llmLoading && (
                    <div className="text-center my-4">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-2">Generating meal details…</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error mt-4">
                        <span>{error}</span>
                    </div>
                )}

                {mealForm && (
                    <div className="bg-base-200 p-6 rounded-lg shadow mt-8">
                        <h2 className="text-2xl font-semibold text-center mb-4">Review & Edit Meal</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                ["title", "Title"],
                                ["calories", "Calories"],
                                ["protein", "Protein (g)"],
                                ["carb", "Carbs (g)"],
                                ["fat", "Fat (g)"],
                                ["fiber", "Fiber (g)"],
                                ["sugar", "Sugar (g)"],
                            ].map(([field, label]) => (
                                <label key={field} className="form-control">
                                    <span className="label-text font-semibold">{label}</span>
                                    <input
                                        type={field === "title" ? "text" : "number"}
                                        className="input input-bordered"
                                        value={(mealForm as any)[field] ?? ""}
                                        onChange={(e) =>
                                            handleMealChange(
                                                field as keyof MealData,
                                                field === "title"
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
                            {["description", "instruction"].map((field) => (
                                <div key={field}>
                                    <span className="font-semibold mb-2 block text-lg capitalize">{field}</span>
                                    <textarea
                                        className="textarea textarea-bordered resize-none bg-base-100"
                                        rows={4}
                                        value={(mealForm as any)[field]}
                                        onChange={(e) =>
                                            handleMealChange(field as keyof MealData, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                className="btn btn-primary mx-2"
                                onClick={handleSaveMeal}
                                disabled={saving}
                            >
                                {saving ? "Saving…" : "Save Meal"}
                            </button>
                            <button className="btn btn-secondary mx-2" onClick={handleClear}>
                                Clear
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
