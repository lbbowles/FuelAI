import React, {useState} from "react";
import {View, Text, ScrollView, TouchableOpacity, Alert, Image} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import * as ImagePicker from 'expo-image-picker';

// Placeholder for the days meals, I am not actually pulling from the database here.
const sampleMeals: Record<string, { breakfast: string; lunch: string; dinner: string }> = {};

function formatNice(dateStr: string) {
    // Parse YYYY-MM-DD manually.
    const [year, month, day] = dateStr.split('-').map(Number);

    // Appears with wrong date unless subtracted by 1.
    const d = new Date(year, month - 1, day);

    // Format the date in a pleasing way like: "Tuesday, September 9, 2025"
    return d.toLocaleDateString('en-US', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Based on specific route (date) provided.
export default function FoodForDay() {
    const isDark = useColorScheme() === "dark";
    // Ascertain date from route
    const { date } = useLocalSearchParams<{ date: string }>();
    const key = typeof date === "string" ? date : Array.isArray(date) ? date[0] : "";

    const [image, setImage] = useState<string | null>(null);

    // For right now, these are hardcoded, shouldn't be painful to get them from DB.
    const meals = sampleMeals[key] || {
        breakfast: "Oatmeal with berries",
        lunch: "Grilled chicken salad",
        dinner: "Salmon with veggies",
    };

    // Function to take a photo and add it to the images array.
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        // If permission is not granted, inform user they must enable it.
        if (!permissionResult.granted) {
            Alert.alert("Permission Required", "Camera access is required to take photos.");
            return;
        }

        // Launch camera and get image.
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <ScrollView className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"} px-6 py-12`}>

                <Text className={`text-2xl font-bold text-center ${isDark ? "text-secondary" : "text-primary"}`}>
                    Food for {formatNice(key)}
                </Text>

                <View className={`mt-8 rounded-2xl p-4 border ${isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"}`}>
                    <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Breakfast: {meals.breakfast}</Text>
                </View>

                <View className={`mt-4 rounded-2xl p-4 border ${isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"}`}>
                    <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Lunch: {meals.lunch}</Text>
                </View>

                <View className={`mt-4 rounded-2xl p-4 border ${isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"}`}>
                    <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Dinner: {meals.dinner}</Text>
                </View>

                {/* Camera Button */}
                <View className="mt-8">
                    <TouchableOpacity
                        onPress={takePhoto}
                        className={`rounded-2xl p-4 border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}
                    >
                        <Text className={`text-center font-semibold ${isDark ? "text-secondary" : "text-primary"}`}>
                            Change of plans? Take a Photo of what you ate!
                        </Text>
                    </TouchableOpacity>

                    {image && (
                        <View className="mt-4 items-center">
                            <Image
                                source={{ uri: image }}
                                className="w-48 h-48 rounded-xl"
                            />
                        </View>
                    )}
                </View>

                <View className="mt-10 items-center">
                    <Link href="/(tabs)/calendar">
                        <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>← Back to calendar</Text>
                    </Link>
                </View>

            </ScrollView>
        </ThemeProvider>
    );
}