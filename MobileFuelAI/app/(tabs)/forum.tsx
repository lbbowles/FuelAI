import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { icons } from "@/constants/icons";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";

const Forum = () => {
    const { session } = useAuth();
    const isDark = useColorScheme() === "dark";
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const api = withAuth(session.access_token);
            const data = await api.getAllPosts();
            //console.log('Posts data:', JSON.stringify(data.posts[0], null, 2));
            setPosts(data.posts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <View className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"}`}>
                <ScrollView className="flex-1 px-5" contentContainerClassName="pb-16">
                    {/* Header */}
                    <View className="items-center">
                        <Image source={icons.logo} className="w-14 h-14 mt-16" />
                        <Text className={`mt-3 text-2xl font-semibold ${isDark ? 'text-secondary' : 'text-primary'}`}>
                            Forum
                        </Text>
                        <Text className={`${isDark ? 'text-secondary/70' : 'text-primary/60'} mt-1`}>
                            Share tips, ask questions, and Fuel each other
                        </Text>
                    </View>

                    {/* Loading State */}
                    {loading ? (
                        <View className="mt-20 items-center">
                            <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
                        </View>
                    ) : posts.length === 0 ? (
                        <View className={`mt-10 rounded-2xl p-6 border ${
                            isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                        }`}>
                            <Text className={`text-center ${isDark ? "text-white/60" : "text-black/50"}`}>
                                No posts yet. Be the first to start the conversation!
                            </Text>
                        </View>
                    ) : (
                        /* Post cards */
                        <View className="mt-6 space-y-4">
                            {posts.map((post) => (
                                <TouchableOpacity
                                    key={post.id}
                                    onPress={() => router.push(`/forum/${post.id}`)}
                                    className={`rounded-2xl p-4 border ${
                                        isDark ? 'bg-secondary/10 border-secondary/15' : 'bg-primary/5 border-primary/10'
                                    }`}
                                >
                                    <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                        {post.title}
                                    </Text>
                                    <Text className={`${isDark ? "text-white/70" : "text-black/60"} mt-1`}>
                                        by @{post.username || 'Unknown'}
                                    </Text>
                                    <Text className={`${isDark ? "text-white/85" : "text-black/80"} mt-2`} numberOfLines={2}>
                                        {post.content}
                                    </Text>

                                    <View className="flex-row items-center justify-between mt-3">
                                        <Text className={`${isDark ? "text-white/60" : "text-black/50"} text-xs`}>
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </Text>
                                        <Text className={`${isDark ? "text-white/80" : "text-black/70"}`}>
                                            {post.reply_count} replies
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <View className="h-20" />
                </ScrollView>

                {/* Floating action button to create post */}
                <View className="absolute bottom-8 right-6">
                    <TouchableOpacity
                        onPress={() => router.push('/forum/makeForum')}
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

export default Forum;