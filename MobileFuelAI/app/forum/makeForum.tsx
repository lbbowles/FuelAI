import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { withAuth } from '@/services/api';
import { router } from 'expo-router';
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function MakeForum() {
    const { session } = useAuth();
    const isDark = useColorScheme() === 'dark';
    const insets = useSafeAreaInsets();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [forumId] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validation
        if (!title || title.length < 5) {
            Alert.alert('Error', 'Title must be at least 5 characters');
            return;
        }

        if (!content || content.length < 10) {
            Alert.alert('Error', 'Content must be at least 10 characters');
            return;
        }

        setLoading(true);

        try {
            console.log('Session token:', session?.access_token);
            const api = withAuth(session.access_token);
            console.log('Attempting to create post with:', { forumId, title, content });
            const result = await api.createPost(forumId, title, content);
            console.log('Success result:', result);

            Alert.alert('Success', 'Post created!', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Failed to create post:', error);
            Alert.alert('Error', `Failed to create post: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: isDark ? '#000' : '#fff',
                padding: 20,
                paddingTop: insets.top + 10
            }}
        >
            {/* Back button */}
            <TouchableOpacity onPress={() => router.back()} className="mb-4">
                <Text className={`text-lg ${isDark ? "text-secondary" : "text-primary"}`}>
                    ← Back to Forums
                </Text>
            </TouchableOpacity>

            <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginBottom: 24,
                color: isDark ? '#fff' : '#000'
            }}>
                Create New Post
            </Text>

            <Text style={{
                color: isDark ? '#fff' : '#000',
                marginBottom: 8,
                fontWeight: '500'
            }}>
                Title (min 5 characters):
            </Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter post title..."
                placeholderTextColor={isDark ? '#888' : '#999'}
                style={{
                    borderWidth: 1,
                    borderColor: isDark ? '#333' : '#ddd',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#000',
                    padding: 12,
                    marginBottom: 20,
                    borderRadius: 8,
                    fontSize: 16
                }}
            />

            <Text style={{
                color: isDark ? '#fff' : '#000',
                marginBottom: 8,
                fontWeight: '500'
            }}>
                Content (min 10 characters):
            </Text>
            <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="What's on your mind?"
                placeholderTextColor={isDark ? '#888' : '#999'}
                multiline
                numberOfLines={8}
                style={{
                    borderWidth: 1,
                    borderColor: isDark ? '#333' : '#ddd',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#000',
                    padding: 12,
                    marginBottom: 24,
                    borderRadius: 8,
                    minHeight: 150,
                    textAlignVertical: 'top',
                    fontSize: 16
                }}
            />

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                style={{
                    backgroundColor: loading ? '#999' : '#3b82f6',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                    {loading ? 'Creating...' : 'Create Post'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}