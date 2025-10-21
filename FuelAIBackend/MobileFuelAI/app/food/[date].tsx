import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

//Placeholder for the days meals, I am not actually pulling from the database here.
const sampleMeals: Record<string, { breakfast: string; lunch: string; dinner: string }> = {};

function formatNice(dateStr: string) {
  const d = new Date(dateStr);
  // If the date is invalid, return the original string
  if (isNaN(d.getTime())) return dateStr;
  // Format the date as "Monday, January 1, 2024" from the date object
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

// Based on specific route provided.
export default function FoodForDay() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const isDark = useColorScheme() === "dark";
  const key = typeof date === "string" ? date : Array.isArray(date) ? date[0] : "";


  const meals = sampleMeals[key] || {
        breakfast: "Oatmeal with berries",
        lunch: "Grilled chicken salad",
        dinner: "Salmon with veggies",
  };
  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <ScrollView className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"} px-6 py-12`}>

        <Text className={`text-2xl font-bold text-center ${isDark ? "text-secondary" : "text-primary"}`}>
            {/*Date extracted from URL, feed to function to format nicely. */}
          Food for {formatNice(key)}
        </Text>

          {/*Simple Card Print just like used in forms and previous iteration / placeholder for home.*/}

        <View className={`mt-8 rounded-2xl p-4 border ${isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"}`}>
          <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Breakfast: {meals.breakfast}</Text>
        </View>

        <View className={`mt-4 rounded-2xl p-4 border ${isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"}`}>
          <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Lunch: {meals.lunch}</Text>
        </View>

        <View className={`mt-4 rounded-2xl p-4 border ${isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"}`}>
          <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Dinner: {meals.dinner}</Text>
        </View>

        <View className="mt-10 items-center">
          <Link href="/(tabs)/calendar">
            <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Back to calendar</Text>
          </Link>
        </View>

      </ScrollView>
    </ThemeProvider>
  );
}
