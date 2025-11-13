import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { withAuth } from '@/services/api';
import { router } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateTask() {
    const { session } = useAuth();
    const isDark = useColorScheme() === 'dark';
    const insets = useSafeAreaInsets();

    const [content, setContent] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [category, setCategory] = useState('General');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false);

    const difficulties = ['easy', 'medium', 'hard'];
    const categories = ['General', 'Work', 'Personal', 'Health', 'Finance', 'Other'];

    const handleSubmit = async () => {
        // Validation
        if (!content || content.length < 3) {
            Alert.alert('Error', 'Task content must be at least 3 characters');
            return;
        }

        setLoading(true);

        try {
            const api = withAuth(session.access_token);
            const result = await api.createTask(
                content,
                difficulty,
                category,
                deadline || null
            );

            Alert.alert('Success', 'Task created!', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Failed to create task:', error);
            Alert.alert('Error', `Failed to create task: ${error.message}`);
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
                    ← Back
                </Text>
            </TouchableOpacity>

            <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginBottom: 24,
                color: isDark ? '#fff' : '#000'
            }}>
                Create New Task
            </Text>

            {/* Task Content */}
            <Text style={{
                color: isDark ? '#fff' : '#000',
                marginBottom: 8,
                fontWeight: '500'
            }}>
                Task Description <Text style={{ color: '#ef4444' }}>*</Text>
            </Text>
            <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="What do you need to do?"
                placeholderTextColor={isDark ? '#888' : '#999'}
                multiline
                numberOfLines={4}
                style={{
                    borderWidth: 1,
                    borderColor: isDark ? '#333' : '#ddd',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#000',
                    padding: 12,
                    marginBottom: 20,
                    borderRadius: 8,
                    minHeight: 100,
                    textAlignVertical: 'top',
                    fontSize: 16
                }}
            />

            {/* Difficulty */}
            <Text style={{
                color: isDark ? '#fff' : '#000',
                marginBottom: 8,
                fontWeight: '500'
            }}>
                Difficulty
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
                {difficulties.map((diff) => (
                    <TouchableOpacity
                        key={diff}
                        onPress={() => setDifficulty(diff)}
                        style={{
                            flex: 1,
                            padding: 12,
                            borderRadius: 8,
                            borderWidth: 2,
                            borderColor: difficulty === diff ? '#3b82f6' : (isDark ? '#333' : '#ddd'),
                            backgroundColor: difficulty === diff ? '#3b82f6' : (isDark ? '#1a1a1a' : '#f5f5f5'),
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            color: difficulty === diff ? '#fff' : (isDark ? '#fff' : '#000'),
                            fontWeight: '600',
                            textTransform: 'capitalize'
                        }}>
                            {diff}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Category */}
            <Text style={{
                color: isDark ? '#fff' : '#000',
                marginBottom: 8,
                fontWeight: '500'
            }}>
                Category
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setCategory(cat)}
                        style={{
                            padding: 10,
                            borderRadius: 8,
                            borderWidth: 2,
                            borderColor: category === cat ? '#3b82f6' : (isDark ? '#333' : '#ddd'),
                            backgroundColor: category === cat ? '#3b82f6' : (isDark ? '#1a1a1a' : '#f5f5f5'),
                        }}
                    >
                        <Text style={{
                            color: category === cat ? '#fff' : (isDark ? '#fff' : '#000'),
                            fontWeight: '500'
                        }}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Deadline */}
            <Text style={{
                color: isDark ? '#fff' : '#000',
                marginBottom: 8,
                fontWeight: '500'
            }}>
                Deadline (Optional)
            </Text>
            <TextInput
                value={deadline}
                onChangeText={setDeadline}
                placeholder="YYYY-MM-DD (e.g., 2025-12-31)"
                placeholderTextColor={isDark ? '#888' : '#999'}
                style={{
                    borderWidth: 1,
                    borderColor: isDark ? '#333' : '#ddd',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#000',
                    padding: 12,
                    marginBottom: 24,
                    borderRadius: 8,
                    fontSize: 16
                }}
            />

            {/* Submit Button */}
            <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                style={{
                    backgroundColor: loading ? '#999' : '#3b82f6',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginBottom: 40
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                    {loading ? 'Creating...' : 'Create Task'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}