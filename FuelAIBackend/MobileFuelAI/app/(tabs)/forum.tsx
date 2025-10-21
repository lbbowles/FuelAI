import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { icons } from "@/constants/icons";

const Forum = () => {
    // Check whether in light or dark mode apply to colorScheme.  Less wordy and more intuitive than I have it in others.  I just cannot be bothered to change them lol.
    const isDark = useColorScheme() === "dark";

    // Dummy threads to display as visual cards only
    const cards = [
        {
            id: "t1",
            title: "Best post‑workout meals?",
            author: "alex",
            snippet: "What are your go‑to meals after lifting? Looking for high protein but easy...",
            tags: ["nutrition", "workout"],
            replies: 12,
            likes: 48,
        },
        {
            id: "t2",
            title: "Meal prep ideas for busy weeks",
            author: "sam",
            snippet: "Share your favorite easy meal prep combos. I’m trying to keep it under 30 min...",
            tags: ["meal-prep", "tips"],
            replies: 8,
            likes: 31,
        },
        {
            id: "t3",
            title: "Cutting without losing strength",
            author: "jordan",
            snippet: "Any tips on keeping strength while cutting calories? Macros? Timing?",
            tags: ["cutting", "strength"],
            replies: 22,
            likes: 77,
        },
    ];

    return (
        // Wrap in ThemeProvider to apply the correct background color.
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-16">
                    {/* Header; same logic as other pages*/}
                    <View className="items-center">
                        <Image source={icons.logo} className="w-14 h-14 mt-16" />
                        <Text className={`mt-3 text-2xl font-semibold ${isDark ? 'text-secondary' : 'text-primary'}`}>
                            Forum
                        </Text>
                        {/*Fancy lil subtext*/}
                        <Text className={`${isDark ? 'text-secondary/70' : 'text-primary/60'} mt-1`}>
                            Share tips, ask questions, and Fuel each other
                        </Text>
                    </View>

                    {/* Search (visual only) I have created a component for this in the components folder.  I just haven't made it lol */}
                    <View
                        className={`mt-6 rounded-2xl px-4 py-3 flex-row items-center border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}
                    >
                        <Text className={`${isDark ? "text-white/70" : "text-black/60"}`}>Search topics...</Text>
                    </View>

                    {/* Thread cards, similar logic to index page */}
                    <View className="mt-6 space-y-4">
                        {cards.map((t) => (
                            <View
                                key={t.id}
                                className={`rounded-2xl p-4 border ${
                                    isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                                }`}
                            >
                                <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                    {t.title}
                                </Text>
                                <Text className={`${isDark ? "text-white/70" : "text-black/60"} mt-1`}>
                                    by @{t.author}
                                </Text>
                                <Text className={`${isDark ? "text-white/85" : "text-black/80"} mt-2`} numberOfLines={2}>
                                    {t.snippet}
                                </Text>

                                <View className="flex-row items-center justify-between mt-3">
                                    <View className="flex-row gap-2">
                                        {t.tags.map((tag) => (
                                            <View
                                                key={tag}
                                                className={`px-2 py-1 rounded-full ${
                                                    isDark ? "bg-white/10" : "bg-black/10"
                                                }`}
                                            >
                                                <Text className={`${isDark ? "text-white/80" : "text-black/70"}`}>#{tag}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/*Replies and likes*/}

                                    <View className="flex-row gap-4">
                                        <Text className={`${isDark ? "text-white/80" : "text-black/70"}`}>{t.replies} replies</Text>
                                        <Text className={`${isDark ? "text-white/80" : "text-black/70"}`}>{t.likes} likes</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="h-20" />
                </ScrollView>

                {/* Unscrollable floating action button to post */}
                <View className="absolute bottom-8 right-6">
                    <View
                        className={`w-14 h-14 rounded-full items-center justify-center shadow-lg ${
                            isDark ? "bg-white/20" : "bg-black/10"
                        }`}
                    >
                        <Text className={`${isDark ? "text-white" : "text-black"}`}>+</Text>
                    </View>
                </View>
            </View>
        </ThemeProvider>
    );
};

export default Forum; 