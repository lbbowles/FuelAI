import {View, useColorScheme, Image, ScrollView, Text, Button, Alert} from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useState } from "react";
import { icons } from "@/constants/icons";

export default function Index() {
    // Check whether in light or dark mode apply to colorScheme
    const colorScheme = useColorScheme();

    // State to toggle between "Choose Your Plan" and "Change Your Life".  Just a silly lil easter egg tool I found in
    // documentation, it holds no real purpose.
    const [titleText, setTitleText] = useState("Choose Your Plan");
    const onPressTitle = () => {
        setTitleText((prev) => (prev === "Choose Your Plan" ? "Change Your Life" : "Choose Your Plan"));
    };

    // Options for FuelAI plans in the form of cards.
    const cards = [
        {
            id: "starter",
            title: "Starter                                                             $5/month",
            bullets: [
                "Expanded AI Credits",
                "Access to better models",
                "Basic recipe generation",
                "Forum access",
                "Email support",
                "Up to 100 AI queries/month",
            ],
        },
        {
            id: "pro",
            title: "Pro                                                                  $10/month",
            bullets: [
                "Everything in Starter",
                "Advanced AI models",
                "Unlimited recipe generation",
                "Exercise recommendations",
                "Priority support",
                "Up to 500 AI queries/month",
                "Custom meal planning",
            ],
        },
        {
            id: "premium",
            title: "Premium                                                       $20/month",
            bullets: [
                "Everything in Pro",
                "Latest AI models",
                "Unlimited AI queries",
                "Advanced analytics",
                "24/7 priority support",
                "Custom integrations",
                "Advanced meal analytics",
                "Nutritionist consultations",
            ],
        },
    ];

    // Detect whether the app is in light or dark mode.
    const isDark = useColorScheme() === "dark";

    return (
        // Wrap in ThemeProvider to apply the correct background color.
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View
                className={`flex-1 ${
                    // Display different backsplash depending on whether the theme detected is light or dark
                    isDark ? "bg-primary" : "bg-secondary"}`}
            >
                {/*Allows Scrolling*/}
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-16">
                    <Image source={icons.logo} className="w-14 h-14 mt-16 mx-auto" />

                    <Text
                        className={`text-[22px] font-semibold text-center mt-4 ${isDark ? 'text-secondary' : 'text-primary'}`}
                        onPress={onPressTitle}
                    >
                        {titleText}
                    </Text>

                    {/*Start card display*/}
                    <View className="mt-6 space-y-4">
                        {cards.map((card) => (
                            <View
                                // Display card information depending on light or dark mode.
                                key={card.id}
                                className={`rounded-2xl p-4 ${isDark ? "bg-white/10" : "bg-black/5"} border ${
                                    isDark ? "border-white/15" : "border-black/10"
                                }`}
                            >
                                <Text className={`text-lg mb-2 ${isDark ? "text-white" : "text-black"}`}>
                                    {card.title}
                                </Text>
                                <View className="gap-2">
                                    {/*Loop through each bullet in the list*/}
                                    {card.bullets.map((b, idx) => (
                                        // React requires a unique key for lists
                                        <View key={idx} className="flex-row items-start">
                                            {/*actual bullet symbol*/}
                                            <Text className={`mr-2 ${isDark ? "text-white" : "text-black"}`}>•</Text>
                                            {/*contents of bullet*/}
                                            <Text className={`${isDark ? "text-white/90" : "text-black/80"}`}>{b}</Text>
                                        </View>
                                    ))}


                                    {/*There are a lot of buttons we can use, this is an easy one that works no matter the device, but is ugly*/}
                                    <Button
                                        title="Purchase"
                                        onPress={() => Alert.alert('Sucker 💀')}
                                    />

                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </ThemeProvider>
    );
}
