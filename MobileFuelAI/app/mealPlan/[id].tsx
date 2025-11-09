import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";

// Type definitions for TypeScript otherwise I get a bunch of annoying "errors".  It runs without these just highlights references.
type Meal = {
    id: number;
    name: string;
    description: string;
    calories: number;
    protein: number;
};

type MealPlanMeal = {
    id: number;
    meal_plan_id: number;
    meal_id: number;
    day_of_week: string;
    meal_time: string;
    meal: Meal;
};

type MealPlan = {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

// Days of the week for the schedule
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// Meal times for each day
const mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const MealPlanView = () => {
    const { session } = useAuth();
    const isDark = useColorScheme() === "dark";
    const { id } = useLocalSearchParams<{ id: string }>();

    // State management
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [mealPlanMeals, setMealPlanMeals] = useState<MealPlanMeal[]>([]);
    const [loading, setLoading] = useState(true);

    // Create meal modal state
    const [showCreateMeal, setShowCreateMeal] = useState(false);
    const [newMealName, setNewMealName] = useState('');
    const [newMealDescription, setNewMealDescription] = useState('');
    const [newMealCalories, setNewMealCalories] = useState('');
    const [newMealProtein, setNewMealProtein] = useState('');
    const [newMealCarbs, setNewMealCarbs] = useState('');
    const [newMealFat, setNewMealFat] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch meal plan data on component mount
    useEffect(() => {
        fetchMealPlan();
    }, [id]);

    // Fetch the meal plan and its assigned meals from the API
    const fetchMealPlan = async () => {
        try {
            setLoading(true);
            const api = withAuth(session.access_token);
            const data = await api.getMealPlan(Number(id));
            setMealPlan(data.meal_plan);
            setMealPlanMeals(data.meal_plan_meals || []);
        } catch (error) {
            console.error('Failed to fetch meal plan:', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get the meal for a specific day and time slot
    const getMealForSlot = (day: string, time: string) => {
        return mealPlanMeals.find(
            (mpm) => mpm.day_of_week === day && mpm.meal_time === time
        );
    };

    // Handle creating a new meal
    const handleCreateMeal = async () => {
        // Validate that meal name is provided
        if (!newMealName.trim()) {
            Alert.alert('Error', 'Meal name is required');
            return;
        }

        setIsSubmitting(true);
        try {
            const api = withAuth(session.access_token);
            // Call API to create the meal
            const result = await api.createMeal(
                newMealName,
                newMealDescription,
                Number(newMealCalories) || 0,
                Number(newMealProtein) || 0,
                Number(newMealCarbs) || 0,
                Number(newMealFat) || 0
            );

            // Reset form fields
            setNewMealName('');
            setNewMealDescription('');
            setNewMealCalories('');
            setNewMealProtein('');
            setNewMealCarbs('');
            setNewMealFat('');

            // Close the modal
            setShowCreateMeal(false);

            // Show success message
            Alert.alert('Success', 'Meal created successfully!');
        } catch (error) {
            console.error('Failed to create meal:', error);
            Alert.alert('Error', 'Failed to create meal');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state - show spinner while fetching data
    if (loading) {
        return (
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
                <View className={`flex-1 items-center justify-center ${isDark ? "bg-primary" : "bg-secondary"}`}>
                    <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
                </View>
            </ThemeProvider>
        );
    }

    // Error state - meal plan not found
    if (!mealPlan) {
        return (
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
                <View className={`flex-1 items-center justify-center ${isDark ? "bg-primary" : "bg-secondary"}`}>
                    <Text className={isDark ? "text-white" : "text-black"}>Meal plan not found</Text>
                </View>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-16">
                    {/* Header Section */}
                    <View className="mt-16 mb-6">
                        {/* Back button */}
                        <TouchableOpacity onPress={() => router.back()} className="mb-4">
                            <Text className={`text-lg ${isDark ? "text-secondary" : "text-primary"}`}>
                                ← Back to Meal Plans
                            </Text>
                        </TouchableOpacity>

                        {/* Meal plan name */}
                        <Text className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                            {mealPlan.name}
                        </Text>
                        {/* Optional description */}
                        {mealPlan.description && (
                            <Text className={`mt-2 ${isDark ? "text-white/70" : "text-black/60"}`}>
                                {mealPlan.description}
                            </Text>
                        )}
                    </View>

                    {/* Create New Meal Button */}
                    <TouchableOpacity
                        onPress={() => setShowCreateMeal(true)}
                        className={`rounded-2xl p-4 mb-6 border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}
                    >
                        <Text className={`text-center text-lg font-semibold ${isDark ? "text-secondary" : "text-primary"}`}>
                            + Create New Meal
                        </Text>
                    </TouchableOpacity>

                    {/* Weekly Schedule - Loop through each day */}
                    {daysOfWeek.map((day) => (
                        <View key={day} className="mb-6">
                            {/* Day header */}
                            <Text className={`text-xl font-semibold mb-3 ${isDark ? "text-white" : "text-black"}`}>
                                {day}
                            </Text>

                            {/* Meal slots for this day - Loop through each meal time */}
                            <View className="space-y-3">
                                {mealTimes.map((time) => {
                                    // Check if there's a meal assigned to this slot
                                    const mealSlot = getMealForSlot(day, time);

                                    return (
                                        <View
                                            key={`${day}-${time}`}
                                            className={`rounded-2xl p-4 border ${
                                                isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                                            }`}
                                        >
                                            {/* Meal time header with nutritional info if meal exists */}
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Text className={`font-semibold ${isDark ? "text-white/90" : "text-black/90"}`}>
                                                    {time}
                                                </Text>
                                                {/* Show calories and protein if meal is assigned */}
                                                {mealSlot && (
                                                    <View className="flex-row gap-3">
                                                        <Text className={`text-xs ${isDark ? "text-white/60" : "text-black/50"}`}>
                                                            {mealSlot.meal.calories} cal
                                                        </Text>
                                                        <Text className={`text-xs ${isDark ? "text-white/60" : "text-black/50"}`}>
                                                            {mealSlot.meal.protein}g protein
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>

                                            {/* Display meal details if assigned, otherwise show empty state */}
                                            {mealSlot ? (
                                                <View>
                                                    {/* Meal name */}
                                                    <Text className={`text-base font-medium ${isDark ? "text-white" : "text-black"}`}>
                                                        {mealSlot.meal.name}
                                                    </Text>
                                                    {/* Optional meal description */}
                                                    {mealSlot.meal.description && (
                                                        <Text className={`mt-1 ${isDark ? "text-white/60" : "text-black/50"}`} numberOfLines={2}>
                                                            {mealSlot.meal.description}
                                                        </Text>
                                                    )}
                                                </View>
                                            ) : (
                                                /* Empty slot - no meal assigned */
                                                <Text className={`${isDark ? "text-white/40" : "text-black/30"}`}>
                                                    No meal planned
                                                </Text>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Create Meal Modal */}
                <Modal
                    visible={showCreateMeal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => !isSubmitting && setShowCreateMeal(false)}
                >
                    <ScrollView className="flex-1 bg-black/50 px-6 py-20">
                        <View className={`rounded-2xl p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}>
                            {/* Modal header */}
                            <Text className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                                Create New Meal
                            </Text>

                            {/* Meal name input (required) */}
                            <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>
                                Meal Name <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                value={newMealName}
                                onChangeText={setNewMealName}
                                placeholder="e.g., Grilled Chicken Salad"
                                placeholderTextColor={isDark ? '#666' : '#999'}
                                className={`border rounded-xl p-3 mb-4 ${
                                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                }`}
                            />

                            {/* Description input (optional) */}
                            <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>
                                Description
                            </Text>
                            <TextInput
                                value={newMealDescription}
                                onChangeText={setNewMealDescription}
                                placeholder="Describe the meal..."
                                placeholderTextColor={isDark ? '#666' : '#999'}
                                multiline
                                numberOfLines={2}
                                className={`border rounded-xl p-3 mb-4 ${
                                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                }`}
                                style={{ textAlignVertical: 'top' }}
                            />

                            {/* Nutritional info inputs - Row 1: Calories and Protein */}
                            <View className="flex-row gap-3 mb-4">
                                <View className="flex-1">
                                    <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>Calories</Text>
                                    <TextInput
                                        value={newMealCalories}
                                        onChangeText={setNewMealCalories}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        placeholderTextColor={isDark ? '#666' : '#999'}
                                        className={`border rounded-xl p-3 ${
                                            isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                        }`}
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>Protein (g)</Text>
                                    <TextInput
                                        value={newMealProtein}
                                        onChangeText={setNewMealProtein}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        placeholderTextColor={isDark ? '#666' : '#999'}
                                        className={`border rounded-xl p-3 ${
                                            isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                        }`}
                                    />
                                </View>
                            </View>

                            {/* Nutritional info inputs - Row 2: Carbs and Fat */}
                            <View className="flex-row gap-3 mb-6">
                                <View className="flex-1">
                                    <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>Carbs (g)</Text>
                                    <TextInput
                                        value={newMealCarbs}
                                        onChangeText={setNewMealCarbs}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        placeholderTextColor={isDark ? '#666' : '#999'}
                                        className={`border rounded-xl p-3 ${
                                            isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                        }`}
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>Fat (g)</Text>
                                    <TextInput
                                        value={newMealFat}
                                        onChangeText={setNewMealFat}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        placeholderTextColor={isDark ? '#666' : '#999'}
                                        className={`border rounded-xl p-3 ${
                                            isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                        }`}
                                    />
                                </View>
                            </View>

                            {/* Action buttons - Cancel and Create */}
                            <View className="flex-row gap-3">
                                {/* Cancel button */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowCreateMeal(false);
                                        // Reset all form fields
                                        setNewMealName('');
                                        setNewMealDescription('');
                                        setNewMealCalories('');
                                        setNewMealProtein('');
                                        setNewMealCarbs('');
                                        setNewMealFat('');
                                    }}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gray-500 rounded-xl p-3"
                                >
                                    <Text className="text-white text-center font-semibold">Cancel</Text>
                                </TouchableOpacity>

                                {/* Create button - disabled if no name or submitting */}
                                <TouchableOpacity
                                    onPress={handleCreateMeal}
                                    disabled={isSubmitting || !newMealName.trim()}
                                    className={`flex-1 rounded-xl p-3 ${
                                        isSubmitting || !newMealName.trim() ? 'bg-gray-400' : 'bg-blue-500'
                                    }`}
                                >
                                    <Text className="text-white text-center font-semibold">
                                        {isSubmitting ? 'Creating...' : 'Create Meal'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>

            </View>
        </ThemeProvider>
    );
};

export default MealPlanView;