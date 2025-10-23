import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { icons } from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";

const ViewForum = () => {
    const { session } = useAuth();
    const isDark = useColorScheme() === "dark";
    const { id } = useLocalSearchParams();

    const [post, setPost] = useState(null);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const api = withAuth(session.access_token);
            const data = await api.getPost(Number(id));
            setPost(data.post);
            setThreads(data.threads);
        } catch (error) {
            console.error('Failed to fetch post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
                <View className={`flex-1 items-center justify-center ${isDark ? "bg-primary" : "bg-secondary"}`}>
                    <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
                </View>
            </ThemeProvider>
        );
    }

    if (!post) {
        return (
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
                <View className={`flex-1 items-center justify-center ${isDark ? "bg-primary" : "bg-secondary"}`}>
                    <Text className={isDark ? "text-white" : "text-black"}>Post not found</Text>
                </View>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-24">
                    {/* Header */}
                    <View className="items-center mt-8">
                        <Image source={icons.logo} className="w-14 h-14" />
                    </View>

                    {/* Post Card */}
                    <View
                        className={`mt-6 rounded-2xl p-5 border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}
                    >
                        <Text className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                            {post.title}
                        </Text>
                        <Text className={`${isDark ? "text-white/70" : "text-black/60"} mt-1`}>
                            by @{post.username}
                        </Text>
                        <Text className={`${isDark ? "text-white/85" : "text-black/80"} mt-4 text-base leading-6`}>
                            {post.content}
                        </Text>
                        <Text className={`${isDark ? "text-white/50" : "text-black/40"} mt-4 text-xs`}>
                            {new Date(post.created_at).toLocaleDateString()} · {threads.length} replies
                        </Text>
                    </View>

                    {/* Replies Header */}
                    <View className="mt-8 mb-4">
                        <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>
                            Replies ({threads.length})
                        </Text>
                    </View>

                    {/* Replies/Threads */}
                    {threads.length === 0 ? (
                        <View className={`rounded-2xl p-6 border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}>
                            <Text className={`text-center ${isDark ? "text-white/60" : "text-black/50"}`}>
                                No replies yet. Be the first to share your thoughts!
                            </Text>
                        </View>
                    ) : (
                        <View className="space-y-3">
                            {threads.map((thread) => (
                                <View
                                    key={thread.id}
                                    className={`rounded-2xl p-4 border ${
                                        isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                                    }`}
                                >
                                    <Text className={`${isDark ? "text-white/70" : "text-black/60"} font-medium`}>
                                        @{thread.username}
                                    </Text>
                                    <Text className={`${isDark ? "text-white/85" : "text-black/80"} mt-2`}>
                                        {thread.content}
                                    </Text>
                                    <Text className={`${isDark ? "text-white/40" : "text-black/30"} mt-2 text-xs`}>
                                        {new Date(thread.created_at).toLocaleDateString()}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View className="h-20" />
                </ScrollView>

                {/* Floating Reply Button */}
                <View className="absolute bottom-8 right-6">
                    <TouchableOpacity
                        onPress={() => router.push(`/forum/forumReply?id=${id}`)}
                        className={`w-14 h-14 rounded-full items-center justify-center shadow-lg ${
                            isDark ? "bg-white/20" : "bg-black/10"
                        }`}
                    >
                        <Text className={`text-2xl ${isDark ? "text-white" : "text-black"}`}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemeProvider>
    );
};

export default ViewForum;