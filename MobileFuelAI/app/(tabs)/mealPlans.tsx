import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator, useColorScheme, Image} from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { icons } from "@/constants/icons";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";
import { router } from "expo-router";

type MealPlan = {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

const MealPlans = () => {
    // More utilization of the dark mode detection
    const { session } = useAuth();
    const isDark = useColorScheme() === "dark";

    // Meal plan consts
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanDescription, setNewPlanDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchMealPlans();
    }, []);

    const fetchMealPlans = async () => {
        try {
            setLoading(true);
            const api = withAuth(session.access_token);
            const data = await api.getMealPlans();

            setMealPlans(data.meal_plans);
        } catch (error) {
            console.error('Failed to fetch meal plans:', error);
            Alert.alert('Error', 'Failed to load meal plans');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMealPlan = async () => {
        if (!newPlanName.trim()) {
            Alert.alert('Error', 'Plan name is required');
            return;
        }

        setIsSubmitting(true);
        try {
            const api = withAuth(session.access_token);
            await api.createMealPlan(newPlanName, newPlanDescription);

            setShowCreateModal(false);
            setNewPlanName('');
            setNewPlanDescription('');
            fetchMealPlans(); // Refresh list

            Alert.alert('Success', 'Meal plan created successfully!');
        } catch (error) {
            console.error('Failed to create meal plan:', error);
            Alert.alert('Error', 'Failed to create meal plan');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePlan = (planId: number, planName: string) => {
        Alert.alert(
            'Delete Meal Plan',
            `Are you sure you want to delete "${planName}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const api = withAuth(session.access_token);
                            await api.deleteMealPlan(planId);
                            fetchMealPlans();
                            Alert.alert('Success', 'Meal plan deleted');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete meal plan');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-16">
                    {/* Header */}
                    <View className="items-center mt-16 mb-6">
                        <Image source={icons.logo} className="w-14 h-14" />
                        <Text className={`mt-3 text-2xl font-semibold ${isDark ? 'text-secondary' : 'text-primary'}`}>
                            Meal and Fitness Plans
                        </Text>
                        <Text className={`${isDark ? 'text-secondary/70' : 'text-primary/60'} mt-1`}>
                            {mealPlans.length} {mealPlans.length === 1 ? 'plan' : 'plans'} created
                        </Text>
                    </View>

                    {/* Create Button */}
                    <View className="space-y-3 mb-6">

                        <TouchableOpacity
                            onPress={() => setShowCreateModal(true)}
                            className={`rounded-2xl p-4 ${isDark ? 'bg-dark-100' : 'bg-light-100'}`}
                        >
                            <Text className="text-center text-lg font-semibold text-white">
                                Create Plan
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Loading State */}
                    {loading ? (
                        <View className="mt-20 items-center">
                            <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
                        </View>
                    ) : mealPlans.length === 0 ? (
                        /* Empty State */
                        <View className={`rounded-2xl p-6 border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}>
                            <Text className={`text-center text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}>
                                No meal plans yet
                            </Text>
                            <Text className={`text-center ${isDark ? "text-white/60" : "text-black/50"}`}>
                                Create your first meal plan to organize your weekly meals
                            </Text>
                        </View>
                    ) : (
                        /* Meal Plans List */
                        <View className="space-y-4">
                            {mealPlans.map((plan) => (
                                <View
                                    key={plan.id}
                                    className={`rounded-2xl p-4 border mb-3 ${
                                        isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                                    }`}
                                >
                                    <Text className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                        {plan.name}
                                    </Text>
                                    <Text className={`${isDark ? "text-white/70" : "text-black/60"} mt-2`}>
                                        {plan.description || 'No description available'}
                                    </Text>
                                    <Text className={`${isDark ? "text-white/40" : "text-black/30"} mt-2 text-xs`}>
                                        Created {new Date(plan.created_at).toLocaleDateString()}
                                    </Text>

                                    <View className="flex-row gap-3 mt-4">
                                        <TouchableOpacity
                                            onPress={() => router.push(`/mealPlan/${plan.id}`)}
                                            className={`flex-1 rounded-xl p-3 ${isDark ? 'bg-dark-100' : 'bg-light-100'}`}
                                        >
                                            <Text className="text-white text-center font-semibold">View Plan</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDeletePlan(plan.id, plan.name)}
                                            className="flex-1 bg-red-500 rounded-xl p-3"
                                        >
                                            <Text className="text-white text-center font-semibold">Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                </ScrollView>

                {/* Create Modal */}
                <Modal
                    visible={showCreateModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => !isSubmitting && setShowCreateModal(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/50 px-6">
                        <View className={`w-full max-w-md rounded-2xl p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}>
                            <Text className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                                Create New Meal Plan
                            </Text>

                            <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>
                                Plan Name <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                value={newPlanName}
                                onChangeText={setNewPlanName}
                                placeholder="e.g., Weekly Meal Plan"
                                placeholderTextColor={isDark ? '#666' : '#999'}
                                className={`border rounded-xl p-3 mb-4 ${
                                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                }`}
                            />

                            <Text className={`mb-2 ${isDark ? "text-white/80" : "text-black/80"}`}>
                                Description <Text className="text-gray-500">(Optional)</Text>
                            </Text>
                            <TextInput
                                value={newPlanDescription}
                                onChangeText={setNewPlanDescription}
                                placeholder="Describe your meal plan..."
                                placeholderTextColor={isDark ? '#666' : '#999'}
                                multiline
                                numberOfLines={3}
                                className={`border rounded-xl p-3 mb-6 ${
                                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'
                                }`}
                                style={{ textAlignVertical: 'top' }}
                            />

                            <View className="flex-row gap-3">
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowCreateModal(false);
                                        setNewPlanName('');
                                        setNewPlanDescription('');
                                    }}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gray-500 rounded-xl p-3"
                                >
                                    <Text className="text-white text-center font-semibold">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCreateMealPlan}
                                    disabled={isSubmitting || !newPlanName.trim()}
                                    className={`flex-1 rounded-xl p-3 ${
                                        isSubmitting || !newPlanName.trim() ? 'bg-gray-400' : isDark ? 'bg-dark-100' : 'bg-light-100'
                                    }`}
                                >
                                    <Text className="text-white text-center font-semibold">
                                        {isSubmitting ? 'Creating...' : 'Create Plan'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ThemeProvider>
    );
};

export default MealPlans;