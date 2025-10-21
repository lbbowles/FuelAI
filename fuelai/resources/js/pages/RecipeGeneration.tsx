import { Head, router } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState } from 'react';
import {RecipeFormData, commonAllergies, dietaryOptions, proteinOptions} from '@/data/recipeData';

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

    // Set initial state
    const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
    const [setRecipeName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string>('');

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

    const handleInputChange = (field: keyof RecipeFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const extractRecipeName = (recipeText: string): string => {
        const nameMatch = recipeText.match(/RECIPE_NAME:\s*(.+?)(?:\n|$)/i);
        if (nameMatch && nameMatch[1]) {
            return nameMatch[1].trim();
        }
        return 'Generated Recipe';
    };

    const extractRecipeDescription = (recipeText: string): string => {
        const descMatch = recipeText.match(/RECIPE_DESCRIPTION:\s*([\s\S]+)/i);
        if (descMatch && descMatch[1]) {
            return descMatch[1].trim();
        }
        return recipeText;
    };

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
        setError('');
        setGeneratedRecipe('');

        try {
            const prompt = `Generate a recipe with the following requirements:

            Dietary Requirements: ${formData.dietaryRequirements.join(', ') || 'None specified'}
            Allergies to avoid: ${formData.allergies.join(', ') || 'None'}
            Preferred proteins: ${formData.proteins.join(', ') || 'Any'}
            Target calories: ${formData.caloriesTarget} calories
            Target Proteins: ${formData.proteinsTarget} (g) proteins
            Servings: ${formData.servings}
            Cooking time: ${formData.cookingTime || 'Any'}
            Difficulty level: ${formData.difficulty || 'Any'}
            Cuisine type: ${formData.cuisine || 'Any'}
            Meal type: ${formData.mealType || 'Any'}
            Additional notes: ${formData.additionalNotes || 'None'}

            Please respond EXACTLY in this format with no extra headers, labels, or formatting:

            RECIPE_NAME: [Just the recipe name, nothing else]
            RECIPE_DESCRIPTION: [Complete recipe including: ingredient list with measurements, step-by-step cooking instructions, estimated nutritional information (calories, protein, carbs, fat), cooking time, and difficulty level]

            Make sure the recipe is safe, healthy, and realistic to prepare at home.`;

            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY; //Pull from .env file

            if (!apiKey) {
                throw new Error('OpenRouter API key not found. Please add VITE_OPENROUTER_API_KEY to your .env file.');
            }

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
                    "messages": [
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    "temperature": 0.7,
                    "max_tokens": 2000
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorData}`);
            }

            const data = await response.json();

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }

            const recipeContent = data.choices[0].message.content;
            setGeneratedRecipe(recipeContent);
            setRecipeName(extractRecipeName(recipeContent));

        } catch (error) {
            console.error('Recipe generation error:', error);
            let errorMessage = 'Failed to generate recipe. ';

            if (error instanceof Error) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Please try again.';
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const saveRecipeToMeals = () => {
        if (!generatedRecipe) return;

        const name = extractRecipeName(generatedRecipe);
        const description = extractRecipeDescription(generatedRecipe);

        setIsSaving(true);
        router.post('/meals', {
            name: name,
            description: description
        }, {
            onSuccess: () => {
                alert('Recipe saved to meals successfully!');
            },
            onError: () => {
                alert('Failed to save recipe. Please try again.');
            },
            onFinish: () => {
                setIsSaving(false);
            }
        });
    };

    return (
        <>
            <Head title="Recipe Generator">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            {/* Container for everything*/}

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto p-4 max-w-7xl">
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body text-center">
                            <h1 className="text-4xl font-bold">Recipe Generator</h1>
                            <p className="text-base-content/60 text-lg">
                                Tell us your preferences and we'll create the perfect recipe for you
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <h2 className="text-2xl font-semibold mb-6">Recipe Preferences</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Dietary Requirements</span>
                                    </label>
                                    <div className="space-y-2">
                                        {dietaryOptions.map(option => (
                                            <label key={option} className="label cursor-pointer justify-start gap-2 mr-4">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.dietaryRequirements.includes(option)}
                                                    onChange={() => handleCheckboxChange('dietaryRequirements', option)}
                                                    className="checkbox checkbox-sm border-2 border-black"
                                                />
                                                <span className="label-text">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Allergies */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Allergies & Restrictions</span>
                                    </label>
                                    <div className="space-y-2">
                                        {commonAllergies.map(allergy => (
                                            <label key={allergy} className="label cursor-pointer justify-start gap-2 mr-4">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.allergies.includes(allergy)}
                                                    onChange={() => handleCheckboxChange('allergies', allergy)}
                                                    className="checkbox checkbox-sm border-2 border-black"
                                                />
                                                <span className="label-text">{allergy}</span>
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
                                            <label key={protein} className="label cursor-pointer justify-start gap-2 mr-4">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.proteins.includes(protein)}
                                                    onChange={() => handleCheckboxChange('proteins', protein)}
                                                    className="checkbox checkbox-sm border-2 border-black"
                                                />
                                                <span className="label-text">{protein}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            {/* Additional Settings Row */}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="form-control">
                                    {/* Calories Target  */}
                                    <label className="label">
                                        <span className="label-text">Target Calories</span>
                                        <span className="label-text-alt text-error">Required</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.caloriesTarget}
                                        onChange={(e) => handleInputChange('caloriesTarget', e.target.value)}
                                        placeholder="e.g. 500"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    {/* Proteins Target */}
                                    <label className="label">
                                        <span className="label-text">Target Proteins (g)</span>
                                        <span className="label-text-alt text-error">Required</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.proteinsTarget}
                                        onChange={(e) => handleInputChange('proteinsTarget', e.target.value)}
                                        placeholder="e.g. 40"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    {/* Cooking Time */}
                                    <label className="label">
                                        <span className="label-text">Cooking Time</span>
                                    </label>
                                    <select
                                        value={formData.cookingTime}
                                        onChange={(e) => handleInputChange('cookingTime', e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Any time</option>
                                        <option value="15 minutes">Under 15 min</option>
                                        <option value="30 minutes">Under 30 min</option>
                                        <option value="1 hour">Under 1 hour</option>
                                        <option value="2 hours">Under 2 hours</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    {/* Serving Number */}
                                    <label className="label">
                                        <span className="label-text">Number of Servings</span>
                                    </label>
                                    <select
                                        value={formData.servings}
                                        onChange={(e) => handleInputChange('servings', e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="1">1 serving</option>
                                        <option value="2">2 servings</option>
                                        <option value="4">4 servings</option>
                                        <option value="6">6 servings</option>
                                        <option value="8">8 servings</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    {/* Food Type */}
                                    <label className="label">
                                        <span className="label-text">Cuisine Type</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cuisine}
                                        onChange={(e) => handleInputChange('cuisine', e.target.value)}
                                        placeholder="e.g. Italian, Asian"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    {/* Meal Type */}
                                    <label className="label">
                                        <span className="label-text">Meal Type</span>
                                    </label>
                                    <select
                                        value={formData.mealType}
                                        onChange={(e) => handleInputChange('mealType', e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Any meal</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Snack">Snack</option>
                                        <option value="Dessert">Dessert</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                {/* Difficulty */}
                                <label className="label">
                                    <span className="label-text">Difficulty</span>
                                </label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                    className="select select-bordered"
                                >
                                    <option value="">Any difficulty</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="form-control mt-4">
                                {/* Additional Notes */}
                                <label className="label">
                                    <span className="label-text">Additional Notes</span>
                                </label>
                                <textarea
                                    value={formData.additionalNotes}
                                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                                    placeholder="Any special requests, ingredients you want to use, or cooking methods..."
                                    rows={3}
                                    className="textarea textarea-bordered"
                                />
                            </div>

                            {error && (
                                <div className="alert alert-error mt-4">
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                onClick={generateRecipe}
                                disabled={isLoading || !formData.caloriesTarget || !formData.proteinsTarget}
                                className="btn btn-primary btn-block mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Generating Recipe...
                                    </>
                                ) : (
                                    'Generate Recipe'
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-2xl font-semibold mb-4">Your Generated Recipe</h2>

                            {!generatedRecipe && !isLoading && (
                                <div className="text-center py-12">
                                    <p className="text-base-content/60">Fill out your preferences above and generate a personalized recipe</p>
                                </div>
                            )}

                            {isLoading && (
                                <div className="text-center py-12">
                                    <span className="loading loading-spinner loading-lg text-primary"></span>
                                    <p className="text-base-content/60 mt-4">Creating your perfect recipe...</p>
                                </div>
                            )}

                            {generatedRecipe && (
                                <>
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap">
                                            {generatedRecipe}
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="flex gap-3 justify-end">
                                        <button
                                            onClick={() => {
                                                setGeneratedRecipe('');
                                                setRecipeName('');
                                            }}
                                            className="btn btn-ghost"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            onClick={generateRecipe}
                                            disabled={isLoading}
                                            className="btn btn-outline"
                                        >
                                            Regenerate
                                        </button>
                                        <button
                                            onClick={saveRecipeToMeals}
                                            disabled={isSaving}
                                            className="btn btn-primary"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save to Meals'
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
