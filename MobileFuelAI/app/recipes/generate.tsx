import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    useColorScheme,
    Alert,
    ActivityIndicator
} from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";
import { RecipeFormData, dietaryOptions, commonAllergies, proteinOptions } from "@/data/recipeData";

// Very similar to RecipeGeneration.tsx same logic since we can utilize API calls.

const RecipeGenerator = () => {
    const { session } = useAuth();
    const isDark = useColorScheme() === "dark";

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

    const [generatedRecipe, setGeneratedRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Same logic as RecipeGeneration.tsx for the next multiple consts
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
            Alert.alert('Error', 'Please specify a calorie target.');
            return;
        }

        if (!formData.proteinsTarget) {
            Alert.alert('Error', 'Please specify a protein target.');
            return;
        }

        setIsLoading(true);
        setGeneratedRecipe('');

        try{
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

            const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

            if (!apiKey) {
                throw new Error('OpenAI API key not found. Please add EXPO_PUBLIC_OPENAI_API_KEY to .env.');
            }

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
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

            if (!data.choices || !data.choices[0] || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }

            const recipeContent = data.choices[0].message.content;
            setGeneratedRecipe(recipeContent);

        } catch (error) {
            console.error('Error generating recipe:', error);
            let errorMessage = 'Failed to generate recipe. ';

            if (error instanceof Error) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Please try again.';
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const saveRecipeToMeals = async () => {
        if(!generatedRecipe) return;

        const name = extractRecipeName(generatedRecipe);
        const description = extractRecipeDescription(generatedRecipe);

        // Parse our nutritional information from recipe desc
        const caloriesMatch = description.match(/[-•*]?\s*Calories:\s*(\d+)/i);
        const proteinMatch = description.match(/[-•*]?\s*Protein:\s*(\d+)/i);
        const carbsMatch = description.match(/[-•*]?\s*Carbohydrates:\s*(\d+)/i);
        const fatMatch = description.match(/[-•*]?\s*Fat:\s*(\d+)/i);

        const calories = caloriesMatch ? parseInt(caloriesMatch[1]) : Number(formData.caloriesTarget) || 0;
        const protein = proteinMatch ? parseInt(proteinMatch[1]) : Number(formData.proteinsTarget) || 0;
        const carbs = carbsMatch ? parseInt(carbsMatch[1]) : 0;
        const fat = fatMatch ? parseInt(fatMatch[1]) : 0;

        setIsSaving(true);
        try {
            const api = withAuth(session.access_token);
            await api.createMeal(name, description, calories, protein, carbs, fat);

            Alert.alert('Success', 'Recipe saved to meals successfully!', [
                { text: 'OK', onPress: () => router.back()}
            ]);
        } catch (error) {
            console.error('Failed to save recipe:', error);
            Alert.alert('Error', 'Failed to save recipe. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const CheckboxGroup = ({ title, options, category }: { title: string, options: string[]; category: 'dietaryRequirements' | 'allergies' | 'proteins' }) => (
        <View className="mb-6">
            <Text className={`mb-3 text-base font-semibold ${isDark ? "text-white" : "text-black"}`}>
                {title}
            </Text>
            <View className= "flex-row flex-wrap">
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handleCheckboxChange(category, option)}
                        className="mr-4 mb-2 flex-row items-center"
                    >
                        <View className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
                            formData[category].includes(option)
                                ? (isDark ? 'bg-dark-100 border-dark-100' : 'bg-light-100 border-light-100')
                                : isDark ? 'border-white' : 'border-black'
                        }`}>
                            {formData[category].includes(option) && (
                                <Text className="text-white text-xs">✓</Text>
                            )}
                        </View>
                        <Text className={isDark ? "text-white" : "text-black"}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-20">
                    {/* Header */}
                    <View className="mt-16 mb-6">
                        <TouchableOpacity onPress={() => router.back()} className="mb-4">
                            <Text className={`text-lg ${isDark ? "text-secondary" : "text-primary"}`}>
                                ← Back
                            </Text>
                        </TouchableOpacity>

                        <Text className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                            Eating good doesn't have to be hard; tell us your preferences and we'll generate a recipe for you!
                        </Text>
                    </View>

                    {/* Recipe Preferences Section */}
                    <View className={`rounded-2xl p-5 mb-6 border ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}>

                        {/* Dietary Requirements */}
                        <CheckboxGroup
                            title="Dietary Requirements"
                            options={dietaryOptions}
                            category="dietaryRequirements"
                        />

                        <CheckboxGroup
                            title="Allergies & Restrictions"
                            options={commonAllergies}
                            category="allergies"
                        />

                        <CheckboxGroup
                            title="Preferred Proteins"
                            options={proteinOptions}
                            category="proteins"
                        />

                        {/* Divider */}
                        <View className={`h-px my-6 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />

                        {/* Additional Recipe Settings */}
                        <View className="space-y-4">

                            {/* Calorie Target */}
                            <View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className={`font-medium ${isDark ? "text-white" : "text-black"}`}>
                                        Target Calories
                                    </Text>
                                    <Text className="text-red-500">Required</Text>
                                </View>

                                <TextInput
                                    value={formData.caloriesTarget}
                                    onChangeText={(value) => handleInputChange('caloriesTarget', value)}
                                    placeholder="e.g. 500"
                                    keyboardType="numeric"
                                    placeholderTextColor={isDark ? '#666' : '#999'}
                                    className={`border rounded-xl p-3 ${
                                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                    }`}
                                />
                            </View>

                            {/* Protein Target*/}
                            <View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className={`font-medium ${isDark ? "text-white" : "text-black"}`}>
                                        Target Protein (g)
                                    </Text>
                                    <Text className="text-red-500">Required</Text>
                                </View>
                                <TextInput
                                    value={formData.proteinsTarget}
                                    onChangeText={(value) => handleInputChange('proteinsTarget', value)}
                                    placeholder="e.g. 40"
                                    keyboardType="numeric"
                                    placeholderTextColor={isDark ? '#666' : '#999'}
                                    className={`border rounded-xl p-3 ${
                                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                    }`}
                                />

                            </View>

                            {/* Cooking Time */}
                            <View>
                                <Text className={`mb-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                                    Cooking Time
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {['', '15 minutes', '30 minutes', '1 hour', '2 hours'].map((time, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleInputChange('cookingTime', time)}
                                            className={`px-4 py-2 rounded-full border ${
                                                formData.cookingTime === time
                                                    ? (isDark ? 'bg-dark-100 border-dark-100' : 'bg-light-100 border-light-100')
                                                    : isDark ? 'border-gray-600' : 'border-gray-300'
                                            }`}
                                        >
                                            <Text className={formData.cookingTime === time ? 'text-white' : (isDark ? 'text-white' : 'text-black')}>
                                                {time || 'Any time'}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Number of Servings */}
                            <View>
                                <Text className={`mb-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                                    Number of Servings
                                </Text>
                                <View className="flex-row gap-2">
                                    {['1', '2', '4', '6', '8'].map((num) => (
                                        <TouchableOpacity
                                            key={num}
                                            onPress={() => handleInputChange('servings', num)}
                                            className={`flex-1 px-3 py-3 rounded-xl border ${
                                                formData.servings === num
                                                    ? (isDark ? 'bg-dark-100 border-dark-100' : 'bg-light-100 border-light-100')
                                                    : isDark ? 'border-gray-600' : 'border-gray-300'
                                            }`}
                                        >
                                            <Text className={`text-center ${formData.servings === num ? 'text-white font-semibold' : (isDark ? 'text-white' : 'text-black')}`}>
                                                {num}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Cuisine Type */}
                            <View>
                                <Text className={`mb-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                                    Cuisine Type
                                </Text>
                                <TextInput
                                    value={formData.cuisine}
                                    onChangeText={(value) => handleInputChange('cuisine', value)}
                                    placeholder="e.g. Italian, Asian"
                                    placeholderTextColor={isDark ? '#666' : '#999'}
                                    className={`border rounded-xl p-3 ${
                                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                    }`}
                                />
                            </View>

                            {/* Meal Type */}
                            <View>
                                <Text className={`mb-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                                    Meal Type
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {['', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'].map((type, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleInputChange('mealType', type)}
                                            className={`px-4 py-2 rounded-full border ${
                                                formData.mealType === type
                                                    ? (isDark ? 'bg-dark-100 border-dark-100' : 'bg-light-100 border-light-100')
                                                    : isDark ? 'border-gray-600' : 'border-gray-300'
                                            }`}
                                        >
                                            <Text className={formData.mealType === type ? 'text-white' : (isDark ? 'text-white' : 'text-black')}>
                                                {type || 'Any meal'}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                        {/* Difficulty */}
                        <View className="mt-4">
                            <Text className={`mb-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                                Difficulty
                            </Text>
                            <View className="flex-row gap-2">
                                {['', 'Beginner', 'Intermediate', 'Advanced'].map((level, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleInputChange('difficulty', level)}
                                        className={`flex-1 px-3 py-3 rounded-xl border ${
                                            formData.difficulty === level
                                                ? (isDark ? 'bg-dark-100 border-dark-100' : 'bg-light-100 border-light-100')
                                                : isDark ? 'border-gray-600' : 'border-gray-300'
                                        }`}
                                    >
                                        <Text className={`text-center ${formData.difficulty === level ? 'text-white font-semibold' : (isDark ? 'text-white' : 'text-black')}`}>
                                            {level || 'Any'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Additional Notes */}
                        <View className="mt-4">
                            <Text className={`mb-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                                Additional Notes
                            </Text>
                            <TextInput
                                value={formData.additionalNotes}
                                onChangeText={(value) => handleInputChange('additionalNotes', value)}
                                placeholder="Any special requests, ingredients you want to use, or cooking methods..."
                                placeholderTextColor={isDark ? '#666' : '#999'}
                                multiline
                                numberOfLines={3}
                                className={`border rounded-xl p-3 ${
                                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                }`}
                                style={{ textAlignVertical: 'top' }}
                            />
                        </View>

                        {/* Generate Button */}
                        <TouchableOpacity
                            onPress={generateRecipe}
                            disabled={isLoading || !formData.caloriesTarget || !formData.proteinsTarget}
                            className={`rounded-xl p-4 mt-6 ${
                                isLoading || !formData.caloriesTarget || !formData.proteinsTarget ? 'bg-gray-400' : (isDark ? 'bg-dark-100' : 'bg-light-100')
                            }`}
                        >
                            {isLoading ? (
                                <View className="flex-row items-center justify-center">
                                    <ActivityIndicator color="white" />
                                    <Text className="text-white font-semibold ml-2">Generating Recipe...</Text>
                                </View>
                            ) : (
                                <Text className="text-white text-center font-semibold text-lg">
                                    Generate Recipe
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Your Generated Recipe Section */}
                    <View className={`rounded-2xl p-5 mb-6 border ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}>
                        <Text className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                            Your Generated Recipe
                        </Text>

                        {!generatedRecipe && !isLoading && (
                            <View className="py-12">
                                <Text className={`text-center ${isDark ? "text-white/60" : "text-black/60"}`}>
                                    Fill out your preferences above and generate a personalized recipe
                                </Text>
                            </View>
                        )}

                        {isLoading && (
                            <View className="py-12 items-center">
                                <ActivityIndicator size="large" color={isDark ? "#422ad5" : "#f88f07"} />
                                <Text className={`text-center mt-4 ${isDark ? "text-white/60" : "text-black/60"}`}>
                                    Creating your perfect recipe...
                                </Text>
                            </View>
                        )}

                        {generatedRecipe && (
                            <>
                                <View className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                    <Text className={`${isDark ? "text-white/90" : "text-black/90"}`}>
                                        {generatedRecipe}
                                    </Text>
                                </View>

                                <View className={`h-px my-4 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />

                                <View className="flex-row gap-3 justify-end">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setGeneratedRecipe('');
                                        }}
                                        className={`px-6 py-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
                                    >
                                        <Text className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                            Clear
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={generateRecipe}
                                        disabled={isLoading}
                                        className={`px-6 py-3 rounded-xl border ${
                                            isDark ? 'border-white/20' : 'border-black/20'
                                        }`}
                                    >
                                        <Text className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                            Regenerate
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={saveRecipeToMeals}
                                        disabled={isSaving}
                                        className={`px-6 py-3 rounded-xl ${
                                            isSaving ? 'bg-gray-400' : (isDark ? 'bg-dark-100' : 'bg-light-100')
                                        }`}
                                    >

                                        {isSaving ? (
                                            <View className="flex-row items-center">
                                                <ActivityIndicator size="small" color="white" />
                                                <Text className="text-white font-semibold ml-2">Saving...</Text>
                                            </View>
                                        ) : (
                                            <Text className="text-white font-semibold">
                                                Save to Meals
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}


                    </View>
                </ScrollView>
            </View>
        </ThemeProvider>
    )

};

export default RecipeGenerator;