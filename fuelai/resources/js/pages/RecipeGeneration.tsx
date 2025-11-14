import { Head, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';
import { RecipeFormData, commonAllergies, dietaryOptions, proteinOptions } from '@/data/recipeData';

export default function RecipeGeneration() {
    const [formData, setFormData] = useState<RecipeFormData>({
        dietaryRequirements: [],
        allergies: [],
        proteins: [],
        caloriesTarget: '',
        proteinsTarget: '',
        servings: '4',
        cookingTime: '',
        difficulty: '',
        cuisine: '',
        mealType: '',
        additionalNotes: ''
    });

    // State
    const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
    const [recipeName, setRecipeName] = useState<string>('');   // <— FIXED
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string>('');

    // Checkbox handler
    const handleCheckboxChange = (
        category: 'dietaryRequirements' | 'allergies' | 'proteins',
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    // Input handler
    const handleInputChange = (field: keyof RecipeFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Extract Recipe Name
    const extractRecipeName = (recipeText: string): string => {
        const nameMatch = recipeText.match(/RECIPE_NAME:\s*(.+?)(?:\n|$)/i);
        return nameMatch?.[1]?.trim() ?? "Generated Recipe";
    };

    // Extract Description
    const extractRecipeDescription = (recipeText: string): string => {
        const descMatch = recipeText.match(/RECIPE_DESCRIPTION:\s*([\s\S]+)/i);
        return descMatch?.[1]?.trim() ?? recipeText;
    };



    // Extract instructions
    const extractInstructions = (recipeText: string): string => {
        const match = recipeText.match(/Instructions?:\s*([\s\S]*?)(?:Estimated|Calories:|$)/i);
        if (match) return match[1].trim();
        const stepMatch = recipeText.match(/(\d+\..*)/s);
        return stepMatch ? stepMatch[1].trim() : "";
    };

    // Extract number fields
    const extractNumber = (text: string, label: string): number | null => {
        const regex = new RegExp(`${label}\\s*:?.*?(\\d+)`, "i");
        const match = text.match(regex);
        return match ? Number(match[1]) : null;
    };

    // Extract nutrition macros
    const extractNutrition = (recipeText: string) => ({
        calories: extractNumber(recipeText, "Calories"),
        protein: extractNumber(recipeText, "Protein"),
        carbs: extractNumber(recipeText, "Carbs|Carbohydrates"),
        fat: extractNumber(recipeText, "Fat"),
        fiber: extractNumber(recipeText, "Fiber"),
        sugar: extractNumber(recipeText, "Sugar"),
        sodium: extractNumber(recipeText, "Sodium"),
        other_nutrients: null
    });



    // Generate Recipe
    const generateRecipe = async () => {
        if (!formData.caloriesTarget) {
            setError('Please specify a calorie target');
            return;
        }
        if (!formData.proteinsTarget) {
            setError('Please specify a protein target');
            return;
        }

        setIsLoading(true);
        setGeneratedRecipe('');
        setError('');

        try {
            const prompt = `Generate a recipe with the following requirements:

            Dietary Requirements: ${formData.dietaryRequirements.join(', ') || 'None'}
            Allergies: ${formData.allergies.join(', ') || 'None'}
            Preferred proteins: ${formData.proteins.join(', ') || 'Any'}
            Target calories: ${formData.caloriesTarget}
            Target protein: ${formData.proteinsTarget}
            Servings: ${formData.servings}
            Cooking time: ${formData.cookingTime || 'Any'}
            Difficulty: ${formData.difficulty || 'Any'}
            Cuisine: ${formData.cuisine || 'Any'}
            Meal Type: ${formData.mealType || 'Any'}
            Additional Notes: ${formData.additionalNotes || 'None'}

            Respond EXACTLY in this format:

            RECIPE_NAME: [name]
            RECIPE_DESCRIPTION: [Ingredients + Instructions + Nutrition]`;

            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "FuelAI Recipe Generator",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-4o-mini",
                    "messages": [{ "role": "user", "content": prompt }],
                    "temperature": 0.7,
                    "max_tokens": 2000
                })
            });

            const data = await response.json();

            const recipeContent = data.choices[0].message.content;
            setGeneratedRecipe(recipeContent);
            setRecipeName(extractRecipeName(recipeContent));

        } catch (err) {
            setError("Error generating recipe.");
        } finally {
            setIsLoading(false);
        }
    };

    /* ------------------ SAVE TO DB WITH ALL FIXED FIELDS ------------------ */

    const saveRecipeToMeals = () => {
        if (!generatedRecipe) return;

        const name = extractRecipeName(generatedRecipe);
        const description = extractRecipeDescription(generatedRecipe);
        const instructions = extractInstructions(generatedRecipe);
        const nutrition = extractNutrition(generatedRecipe);

        setIsSaving(true);

        router.post('/meals', {
            name: name,
            description: description,
            instruction: instructions,

            calories: nutrition.calories,
            protein: nutrition.protein,
            carbs: nutrition.carbs,
            fat: nutrition.fat,
            fiber: nutrition.fiber,
            sugar: nutrition.sugar,
            sodium: nutrition.sodium,
            other_nutrients: nutrition.other_nutrients,

            image_base64: null
        }, {
            onSuccess: () => alert("Recipe saved!"),
            onError: () => alert("Failed to save recipe"),
            onFinish: () => setIsSaving(false)
        });
    };

    /* ----------------------------------------------------------------------- */

    return (
        <>
            <Head title="Recipe Generator">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>

            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32">
                <div className="container mx-auto p-4 max-w-7xl">

                    {/* Header */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body text-center">
                            <h1 className="text-4xl font-bold">Recipe Generator</h1>
                            <p className="text-base-content/60 text-lg">
                                Tell us your preferences and we'll create the perfect recipe
                            </p>
                        </div>
                    </div>

                    {/* ---- Preferences Form ---- */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">

                            <h2 className="text-2xl font-semibold mb-6">Recipe Preferences</h2>

                            {/* --- dietary, allergies, proteins --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {/* Dietary Requirements */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Dietary Requirements</span>
                                    </label>
                                    <div className="space-y-2">
                                        {dietaryOptions.map(option => (
                                            <label key={option} className="label cursor-pointer gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.dietaryRequirements.includes(option)}
                                                    onChange={() => handleCheckboxChange('dietaryRequirements', option)}
                                                    className="checkbox checkbox-sm"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Allergies */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Allergies</span>
                                    </label>
                                    <div className="space-y-2">
                                        {commonAllergies.map(allergy => (
                                            <label key={allergy} className="label cursor-pointer gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.allergies.includes(allergy)}
                                                    onChange={() => handleCheckboxChange('allergies', allergy)}
                                                    className="checkbox checkbox-sm"
                                                />
                                                <span>{allergy}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Proteins */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Preferred Proteins</span>
                                    </label>
                                    <div className="space-y-2">
                                        {proteinOptions.map(protein => (
                                            <label key={protein} className="label cursor-pointer gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.proteins.includes(protein)}
                                                    onChange={() => handleCheckboxChange('proteins', protein)}
                                                    className="checkbox checkbox-sm"
                                                />
                                                <span>{protein}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="divider"></div>

                            {/* ---- More Options ---- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                                {/* Calories */}
                                <div className="form-control">
                                    <label className="label">
                                        <span>Target Calories</span>
                                        <span className="label-text-alt text-error">Required</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.caloriesTarget}
                                        onChange={(e) => handleInputChange('caloriesTarget', e.target.value)}
                                        className="input input-bordered"
                                    />
                                </div>

                                {/* Protein Target */}
                                <div className="form-control">
                                    <label className="label">
                                        <span>Target Protein (g)</span>
                                        <span className="label-text-alt text-error">Required</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.proteinsTarget}
                                        onChange={(e) => handleInputChange('proteinsTarget', e.target.value)}
                                        className="input input-bordered"
                                    />
                                </div>

                                {/* Cooking Time */}
                                <div className="form-control">
                                    <label className="label"><span>Cooking Time</span></label>
                                    <select
                                        value={formData.cookingTime}
                                        onChange={(e) => handleInputChange('cookingTime', e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Any</option>
                                        <option value="15 minutes">Under 15 min</option>
                                        <option value="30 minutes">Under 30 min</option>
                                        <option value="1 hour">Under 1 hour</option>
                                        <option value="2 hours">Under 2 hours</option>
                                    </select>
                                </div>

                                {/* Servings */}
                                <div className="form-control">
                                    <label className="label"><span>Servings</span></label>
                                    <select
                                        value={formData.servings}
                                        onChange={(e) => handleInputChange('servings', e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>

                                {/* Cuisine */}
                                <div className="form-control">
                                    <label className="label"><span>Cuisine</span></label>
                                    <input
                                        type="text"
                                        value={formData.cuisine}
                                        onChange={(e) => handleInputChange('cuisine', e.target.value)}
                                        className="input input-bordered"
                                        placeholder="e.g. Italian"
                                    />
                                </div>

                                {/* Meal Type */}
                                <div className="form-control">
                                    <label className="label"><span>Meal Type</span></label>
                                    <select
                                        value={formData.mealType}
                                        onChange={(e) => handleInputChange('mealType', e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Any</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Snack">Snack</option>
                                        <option value="Dessert">Dessert</option>
                                    </select>
                                </div>

                            </div>

                            {/* Difficulty */}
                            <div className="form-control mt-4">
                                <label className="label"><span>Difficulty</span></label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                    className="select select-bordered"
                                >
                                    <option value="">Any</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div className="form-control mt-4">
                                <label className="label"><span>Additional Notes</span></label>
                                <textarea
                                    value={formData.additionalNotes}
                                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                                    className="textarea textarea-bordered"
                                    rows={3}
                                />
                            </div>

                            {error && (
                                <div className="alert alert-error mt-4">
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Generate Button */}
                            <button
                                onClick={generateRecipe}
                                disabled={isLoading}
                                className="btn btn-primary btn-block mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Generating...
                                    </>
                                ) : (
                                    'Generate Recipe'
                                )}
                            </button>

                        </div>
                    </div>

                    {/* ---- Generated Recipe ---- */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">

                            <h2 className="text-2xl font-semibold mb-4">Your Generated Recipe</h2>

                            {!generatedRecipe && !isLoading && (
                                <div className="text-center py-12">
                                    <p className="text-base-content/60">No recipe generated yet.</p>
                                </div>
                            )}

                            {isLoading && (
                                <div className="text-center py-12">
                                    <span className="loading loading-lg"></span>
                                    <p className="text-base-content/60 mt-4">Creating your recipe...</p>
                                </div>
                            )}

                            {generatedRecipe && (
                                <>
                                    <div className="prose max-w-none whitespace-pre-wrap">
                                        {generatedRecipe}
                                    </div>

                                    <div className="divider"></div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => {
                                                setGeneratedRecipe('');
                                                setRecipeName('');
                                            }}
                                        >
                                            Clear
                                        </button>

                                        <button
                                            className="btn btn-outline"
                                            onClick={generateRecipe}
                                            disabled={isLoading}
                                        >
                                            Regenerate
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={saveRecipeToMeals}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <span className="loading loading-spinner"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                "Save to Meals"
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
