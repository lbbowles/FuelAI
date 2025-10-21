import React from "react";
import { View, useColorScheme, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { images } from "@/constants/images";

//New inclusions
import {Link, router} from "expo-router";
import {useAuth} from "../context/AuthContext.js";

export default function Index() {
    const isDark = useColorScheme() === "dark";

    // Allow for signing out / forgetting token and user data.
    const { user, signout } = useAuth();

    // Updated consts to contain non-dummy values with user information ascertained from AuthContext.js
    const username = user?.username ? `@${user.username}` : "@guest";
    const email = user?.email || "No email";
    const role = user?.role || "user";
    const profileImage = user?.profile_image_url || images.profile;

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>

            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>

                <ScrollView className="flex-1 px-6 py-12" contentContainerClassName="items-center pb-20">

                    {/* Avatar */}
                    <View className="w-28 h-28 rounded-full overflow-hidden items-center justify-center border"
                          style={{ borderColor: isDark ? "#ffffff22" : "#00000022" }}>
                        <Image
                            source={user?.profile_image_url ? { uri: profileImage } : profileImage}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Username */}
                    <Text className={`mt-4 text-2xl font-bold ${isDark ? "text-secondary" : "text-primary"}`}>
                        {username}
                    </Text>

                    {/* Email */}
                    <Text className={`${isDark ? "text-secondary/70" : "text-primary/70"} mt-1 text-sm`}>
                        {email}
                    </Text>

                    {/* Bio section */}
                    <Text className={`${isDark ? "text-secondary/70" : "text-primary/70"} mt-1`}>
                        Fueling your day with better choices
                    </Text>

                    {/* Showcase user role */}
                    <View className="mt-2 px-3 py-1 rounded-full"
                          style={{ backgroundColor: isDark ? "#ffffff0f" : "#00000008" }}>
                        <Text className={`text-xs ${isDark ? "text-secondary" : "text-primary"}`}>
                            {role}
                        </Text>

                    </View>

                    {/* Actions */}
                    <View className="w-full max-w-md mt-8">

                        {/* Go to Calendar */}
                        <Link href="/(tabs)/calendar" asChild>

                            <TouchableOpacity
                                className="rounded-2xl px-4 py-4"
                                style={{
                                    backgroundColor: isDark ? "#ffffff0f" : "#00000008",
                                    borderWidth: 1
                                }}
                            >
                                <Text className={`text-lg font-semibold ${isDark ? "text-secondary" : "text-primary"}`}>
                                    Open Calendar
                                </Text>
                            </TouchableOpacity>

                        </Link>

                    </View>

                    {/* Most popular thread (arbitrary) */}
                    <View className="w-full max-w-md mt-10 rounded-2xl p-4 border"

                          style={{ backgroundColor: isDark ? "#ffffff0f" : "#00000008" }}>

                        <Text className={`text-base ${isDark ? "text-secondary/70" : "text-primary/60"}`}>Most popular thread</Text>

                        <Text className={`mt-1 text-xl font-semibold ${isDark ? "text-secondary" : "text-primary"}`}>
                            Best post‑workout meals?
                        </Text>

                        <Text className={`${isDark ? "text-secondary/80" : "text-primary/80"} mt-1`} numberOfLines={2}>
                            What are your go‑to meals after lifting? Looking for high protein but easy...
                        </Text>

                        <View className="mt-3">
                            <Link href="/(tabs)/forum" asChild>

                                <TouchableOpacity
                                    className="px-4 py-2 rounded-full self-start"
                                    style={{ backgroundColor: isDark ? "#ffffff0f" : "#00000008" }}
                                >
                                    <Text className={`${isDark ? "text-secondary" : "text-primary"}`}>Open Forum</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>

                    {/*Sign out by calling AuthContext signout*/}
                    <View className="w-full max-w-md mt-6">
                        <TouchableOpacity
                            onPress={async () => {
                                await signout();
                                // Force to sign in page
                                router.replace('/signin');
                            }}
                            className="rounded-2xl px-4 py-4"
                            style={{
                                backgroundColor: isDark ? "#ffffff0f" : "#00000008",
                                borderWidth: 1,
                                borderColor: "#ef4444"
                            }}
                        >
                            <Text className="text-lg font-semibold text-red-500 text-center">
                                Sign Out
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View className="h-10" />

                </ScrollView>
            </View>
        </ThemeProvider>
    );
}
