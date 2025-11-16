import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { withAuth } from '@/services/api';
import {router, useLocalSearchParams} from 'expo-router';
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function forumReply() {
    const { session } = useAuth();
    const isDark = useColorScheme() === 'dark';
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    // Similar architecture as our makeForum page, we just do not need a title as this is a reply.
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validation

        if (!content || content.length < 10) {
            Alert.alert('Error', 'Content must be at least 10 characters');
            return;
        }

        setLoading(true);

        try {
            const api = withAuth(session.access_token);
            const result = await api.replyToPost(Number(id), content);


            Alert.alert('Success', 'Reply created!', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Failed to create Reply:', error);
            Alert.alert('Error', `Failed to create Reply: ${error.message}`);
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
                Reply to post
            </Text>

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
                placeholder="What do you think about this post?"
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
                    backgroundColor: loading ? '#999' : (isDark ? '#422ad5' : '#f88f07'),
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                    {loading ? 'Commenting...' : 'Reply to post'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}