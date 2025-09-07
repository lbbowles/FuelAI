import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

interface RecipeFormData {
    dietaryRequirements: string[];
    allergies: string[];
    proteins: string[];
    caloriesTarget: string;
    proteinsTarget: string;
    servings: string;
    cookingTime: string;
    difficulty: string;
    cuisine: string;
    mealType: string;
    additionalNotes: string;
}

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

    const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const dietaryOptions = [
        'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Diabetes'
    ];

    const commonAllergies = [
        'Nuts', 'Peanuts', 'Shellfish', 'Fish', 'Eggs', 'Dairy',
        'Soy', 'Wheat', 'Sesame', 'Lactose'
    ];

    const proteinOptions = [
        'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Turkey',
        'Tofu', 'Beans', 'Eggs', 'Cheese'
    ];

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
            const prompt = `Generate a detailed recipe with the following requirements:

Dietary Requirements: ${formData.dietaryRequirements.join(', ') || 'None specified'}
Allergies to avoid: ${formData.allergies.join(', ') || 'None'}
Preferred proteins: ${formData.proteins.join(', ') || 'Any'}
Target calories: ${formData.caloriesTarget} calories
Target Proteins: ${formData.proteinsTarget} proteins
Servings: ${formData.servings}
Cooking time: ${formData.cookingTime || 'Any'}
Difficulty level: ${formData.difficulty || 'Any'}
Cuisine type: ${formData.cuisine || 'Any'}
Meal type: ${formData.mealType || 'Any'}
Additional notes: ${formData.additionalNotes || 'None'}

Please provide:
1. Recipe name
2. Complete ingredient list with measurements
3. Step-by-step cooking instructions
4. Estimated nutritional information (calories, protein, carbs, fat)
5. Cooking time and difficulty
6. Any helpful tips or variations

Make sure the recipe is safe, healthy, and realistic to prepare at home.`;

            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

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

            setGeneratedRecipe(data.choices[0].message.content);

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

    return (
        <>
            <Head title="Recipe Generation" />
            <Navbar />

            <div className="pt-16 min-h-screen bg-background">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Recipe Generator
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Tell us your preferences and we'll create the perfect recipe for you
                        </p>
                    </div>

                    {/* Form Section - Top Half */}
                    <div className="bg-card p-8 rounded-lg border border-border mb-8">
                        <h2 className="text-2xl font-semibold mb-8 text-center">Recipe Preferences</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Dietary Requirements */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Dietary Requirements</label>
                                <div className="space-y-2">
                                    {dietaryOptions.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.dietaryRequirements.includes(option)}
                                                onChange={() => handleCheckboxChange('dietaryRequirements', option)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Allergies */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Allergies & Restrictions</label>
                                <div className="space-y-2">
                                    {commonAllergies.map(allergy => (
                                        <label key={allergy} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.allergies.includes(allergy)}
                                                onChange={() => handleCheckboxChange('allergies', allergy)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{allergy}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Proteins */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Preferred Proteins</label>
                                <div className="space-y-2">
                                    {proteinOptions.map(protein => (
                                        <label key={protein} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.proteins.includes(protein)}
                                                onChange={() => handleCheckboxChange('proteins', protein)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{protein}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Settings Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                            {/* Calories Target */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Target Calories (required)</label>
                                <input
                                    type="number"
                                    value={formData.caloriesTarget}
                                    onChange={(e) => handleInputChange('caloriesTarget', e.target.value)}
                                    placeholder="e.g. 500, 800, 1200"
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Target Proteins (required)</label>
                                <input
                                    type="number"
                                    value={formData.proteinsTarget}
                                    onChange={(e) => handleInputChange('proteinsTarget', e.target.value)}
                                    placeholder="e.g. 20, 40, 80"
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                />
                            </div>

                            {/* Servings */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Number of Servings</label>
                                <select
                                    value={formData.servings}
                                    onChange={(e) => handleInputChange('servings', e.target.value)}
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                >
                                    <option value="1">1 serving</option>
                                    <option value="2">2 servings</option>
                                    <option value="4">4 servings</option>
                                    <option value="6">6 servings</option>
                                    <option value="8">8 servings</option>
                                </select>
                            </div>

                            {/* Cooking Time */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Cooking Time</label>
                                <select
                                    value={formData.cookingTime}
                                    onChange={(e) => handleInputChange('cookingTime', e.target.value)}
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                >
                                    <option value="">Any time</option>
                                    <option value="15 minutes">Under 15 min</option>
                                    <option value="30 minutes">Under 30 min</option>
                                    <option value="1 hour">Under 1 hour</option>
                                    <option value="2 hours">Under 2 hours</option>
                                </select>
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Difficulty</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                >
                                    <option value="">Any difficulty</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Cuisine Type</label>
                                <input
                                    type="text"
                                    value={formData.cuisine}
                                    onChange={(e) => handleInputChange('cuisine', e.target.value)}
                                    placeholder="e.g. Italian, Asian, Mexican"
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Meal Type</label>
                                <select
                                    value={formData.mealType}
                                    onChange={(e) => handleInputChange('mealType', e.target.value)}
                                    className="w-full p-3 border border-border rounded-lg bg-background"
                                >
                                    <option value="">Any meal</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={generateRecipe}
                                    disabled={isLoading || !formData.caloriesTarget}
                                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
                                </button>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-2">Additional Notes</label>
                            <textarea
                                value={formData.additionalNotes}
                                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                                placeholder="Any special requests, ingredients you want to use, or cooking methods..."
                                rows={3}
                                className="w-full p-3 border border-border rounded-lg bg-background"
                            />
                        </div>

                        {error && (
                            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Generated Recipe Section - Bottom Half */}
                    <div className="bg-card p-8 rounded-lg border border-border">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Your Generated Recipe</h2>

                        {!generatedRecipe && !isLoading && (
                            <div className="text-center text-muted-foreground py-12">
                                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                <p>Fill out your preferences above and generate a personalized recipe</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-muted-foreground">Creating your perfect recipe...</p>
                            </div>
                        )}

                        {generatedRecipe && (
                            <div className="prose prose-sm max-w-none">
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {generatedRecipe}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
