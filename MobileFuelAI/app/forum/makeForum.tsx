import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, useColorScheme, ActivityIndicator } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "@/services/api";
import { Picker } from '@react-native-picker/picker';

type Forum = {
    id: number;
    name: string;
    description: string;
};

export default function MakeForum() {
    const { session } = useAuth();
    const isDark = useColorScheme() === "dark";
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [forums, setForums] = useState<Forum[]>([]);
    const [loadingForums, setLoadingForums] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchForums();
    }, []);

    const fetchForums = async () => {
        try {
            setLoadingForums(true);
            const api = withAuth(session.access_token);
            const data = await api.getForums();
            setForums(data.forums || []);
            // Set default to first forum
            if (data.forums && data.forums.length > 0) {
                setCategoryId(data.forums[0].id);
            }
        } catch (error) {
            console.error('Failed to fetch forums:', error);
            Alert.alert("Error", "Failed to load forums");
        } finally {
            setLoadingForums(false);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (!categoryId) {
            Alert.alert("Error", "Please select a forum");
            return;
        }

        setIsSubmitting(true);
        try {
            const api = withAuth(session.access_token);
            await api.createForumPost(title, content, categoryId);
            Alert.alert("Success", "Post created successfully!");
            router.back();
        } catch (error) {
            console.error('Failed to create post:', error);
            Alert.alert("Error", "Failed to create post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingForums) {
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
                <Text className={`text-2xl font-bold ${isDark ? "text-secondary" : "text-primary"} mb-2`}>
                    Create New Post
                </Text>
                <Text className={`${isDark ? "text-secondary/70" : "text-primary/70"} mb-6`}>
                    Share your thoughts with the community
                </Text>

                {/* Forum Selection */}
                <Text className={`mb-2 font-semibold ${isDark ? "text-white" : "text-black"}`}>
                    Forum
                </Text>
                <View className="rounded-xl mb-4 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
                    <Picker
                        selectedValue={categoryId}
                        onValueChange={(itemValue) => setCategoryId(itemValue)}
                        style={{
                            color: isDark ? '#fff' : '#000',
                        }}
                        itemStyle={{
                            height: 50,
                        }}
                    >
                        {forums.map((forum) => (
                            <Picker.Item
                                key={forum.id}
                                label={forum.name}
                                value={forum.id}
                            />
                        ))}
                    </Picker>
                </View>

                {/* Show selected forum description */}
                {categoryId && forums.find(f => f.id === categoryId)?.description && (
                    <Text className={`mb-4 text-sm italic ${isDark ? "text-white/60" : "text-black/60"}`}>
                        {forums.find(f => f.id === categoryId)?.description}
                    </Text>
                )}

                {/* Title Input */}
                <Text className={`mb-2 font-semibold ${isDark ? "text-white" : "text-black"}`}>
                    Title
                </Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter post title..."
                    placeholderTextColor={isDark ? '#666' : '#999'}
                    className={`rounded-xl p-4 mb-4 text-base border ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'
                    }`}
                    maxLength={200}
                />

                {/* Content Input */}
                <Text className={`mb-2 font-semibold ${isDark ? "text-white" : "text-black"}`}>
                    Content
                </Text>
                <TextInput
                    value={content}
                    onChangeText={setContent}
                    placeholder="What's on your mind?"
                    placeholderTextColor={isDark ? '#666' : '#999'}
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                    className={`rounded-xl p-4 mb-6 text-base border ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'
                    }`}
                    style={{ minHeight: 150 }}
                />

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    className={`rounded-xl p-4 items-center ${
                        isSubmitting
                            ? 'bg-gray-400'
                            : isDark ? 'bg-dark-100' : 'bg-light-100'
                    }`}
                >
                    <Text className="text-white text-lg font-semibold">
                        {isSubmitting ? "Posting..." : "Create Post"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </ThemeProvider>
    );
}