import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, useColorScheme } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";

type Post = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    replies_count?: number;
};

export default function UserForum() {
    const { session, user } = useAuth();
    const isDark = useColorScheme() === "dark";

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            setLoading(true);
            const api = withAuth(session.access_token);
            const data = await api.getForumPosts();

            // Filter posts by current user
            const userPosts = data.posts.filter((post: Post) => post.user_id === user.id);
            setPosts(userPosts);
        } catch (error) {
            console.error('Failed to fetch user posts:', error);
            Alert.alert('Error', 'Failed to load your posts');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId: number) => {
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const api = withAuth(session.access_token);
                            await api.deletePost(postId);
                            Alert.alert('Success', 'Post deleted');
                            await fetchUserPosts();
                        } catch (error) {
                            console.error('Failed to delete post:', error);
                            Alert.alert('Error', 'Failed to delete post');
                        }
                    }
                }
            ]
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
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

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <ScrollView
                className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"} px-6 py-12`}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <Text className={`text-lg ${isDark ? "text-secondary" : "text-primary"}`}>
                        ← Back
                    </Text>
                </TouchableOpacity>

                {/* Header */}
                <Text className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"} mb-2`}>
                    My Forum Posts
                </Text>
                <Text className={`${isDark ? "text-white/70" : "text-black/60"} mb-6`}>
                    View and manage your threads
                </Text>

                {/* Stats */}
                <View className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                    <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {posts.length}
                    </Text>
                    <Text className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                        Total Posts
                    </Text>
                </View>

                {/* Posts List */}
                {posts.length === 0 ? (
                    <View className={`rounded-2xl p-8 border ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                        <Text className={`text-center ${isDark ? "text-white/60" : "text-black/60"} mb-4`}>
                            You haven't created any posts yet
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/forum')}
                            className="bg-blue-500 rounded-xl p-3"
                        >
                            <Text className="text-white text-center font-semibold">
                                Create Your First Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    posts.map((post) => (
                        <View
                            key={post.id}
                            className={`mb-4 rounded-2xl p-4 border ${
                                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                            }`}
                        >
                            <TouchableOpacity
                                onPress={() => router.push(`/forum/${post.id}`)}
                                className="mb-3"
                            >
                                <Text className={`text-xl font-bold ${isDark ? "text-white" : "text-black"} mb-2`}>
                                    {post.title}
                                </Text>
                                <Text className={`${isDark ? "text-white/70" : "text-black/70"} mb-3`} numberOfLines={3}>
                                    {post.content}
                                </Text>
                                <View className="flex-row items-center gap-4">
                                    <Text className={`text-sm ${isDark ? "text-white/50" : "text-black/50"}`}>
                                        {formatDate(post.created_at)}
                                    </Text>
                                    {post.replies_count !== undefined && (
                                        <Text className={`text-sm ${isDark ? "text-white/50" : "text-black/50"}`}>
                                            💬 {post.replies_count} {post.replies_count === 1 ? 'reply' : 'replies'}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                            {/* Action Buttons */}
                            <View className="flex-row gap-2 pt-3 border-t" style={{ borderColor: isDark ? '#ffffff20' : '#00000020' }}>
                                <TouchableOpacity
                                    onPress={() => router.push(`/forum/${post.id}`)}
                                    className="flex-1 bg-blue-500 rounded-xl p-3"
                                >
                                    <Text className="text-white text-center font-semibold">View Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDeletePost(post.id)}
                                    className="flex-1 bg-red-500 rounded-xl p-3"
                                >
                                    <Text className="text-white text-center font-semibold">Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </ThemeProvider>
    );
}
