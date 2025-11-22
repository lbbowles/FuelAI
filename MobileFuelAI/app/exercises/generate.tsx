import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, useColorScheme, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { withAuth } from '@/services/api';
import { router } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WorkoutSchedule, fitnessLevels, workoutTypes, equipmentOptions, timeOptions } from '@/data/exerciseData';

export default function GenerateWorkout() {
    const { session } = useAuth();
    const isDark = useColorScheme() === 'dark';
    const insets = useSafeAreaInsets();

    // Form state
    const [userGoal, setUserGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('beginner');
    const [workoutType, setWorkoutType] = useState('full-body');
    const [availableTime, setAvailableTime] = useState('30');
    const [equipment, setEquipment] = useState('none');
    const [injuries, setInjuries] = useState('');

    // Workout state
    const [isLoading, setIsLoading] = useState(false);
    const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutSchedule | null>(null);
    const [error, setError] = useState('');

    // Workout mode state
    const [currentExercise, setCurrentExercise] = useState(0);
    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

    // Task save state
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskDeadline, setTaskDeadline] = useState('');
    const [isSavingToTasks, setIsSavingToTasks] = useState(false);

    const generateWorkout = async () => {
        if (!userGoal.trim()) {
            setError('Please specify your fitness goals for today\'s session.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const prompt = `Generate a comprehensive ${availableTime}-minute ${workoutType} workout plan for a ${fitnessLevel} level individual with ${equipment} equipment available.
    Primary Objective: ${userGoal}
    ${injuries ? `Considerations: Avoid exercises that may aggravate: ${injuries}` : ''}
    
    Return a detailed JSON object with this exact structure:
    {
        "title": "Descriptive workout name",
        "duration": "${availableTime} minutes",
        "description": "Comprehensive workout overview and objectives",
        "totalCaloriesBurned": estimated_calories_for_this_duration,
        "warmUpTime": 5,
        "coolDownTime": 5,
        "exercises": [
            {
                "name": "Exercise name",
                "sets": number_of_sets,
                "reps": "repetition_count_or_time_duration",
                "duration": "optional_time_per_set",
                "description": "Detailed form instructions and execution technique",
                "difficulty": "beginner|intermediate|advanced",
                "muscleGroups": ["primary", "secondary", "muscle", "groups"]
            }
        ],
        "tips": [
            "Evidence-based training advice",
            "Safety and form reminders",
            "Performance optimization tips",
            "Recovery recommendations"
        ]
    }
    
    Include 6-10 exercises with proper progression. Ensure exercise selection aligns with available equipment and injury considerations. Provide scientifically-backed training principles.`;

            const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-4o-mini",
                    "messages": [
                        {
                            role: 'system',
                            content: 'You are a certified personal trainer with expertise in exercise science and kinesiology. Provide safe, effective, evidence-based workout recommendations. Always return valid JSON without markdown formatting or code blocks.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    "temperature": 0.7,
                    "max_tokens": 2000
                })
            });

            const data = await response.json();

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid API response structure');
            }

            const content = data.choices[0].message.content;

            // Strip markdown code blocks if present
            let cleanContent = content;
            if (content.includes('```json')) {
                cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (content.includes('```')) {
                cleanContent = content.replace(/```\n?/g, '');
            }

            const workoutData = JSON.parse(cleanContent.trim());
            setWorkoutSchedule(workoutData);
        } catch (err) {
            setError('Unable to generate personalized workout. Please verify your inputs and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return '#10b981';
            case 'intermediate': return '#f59e0b';
            case 'advanced': return '#ef4444';
            default: return isDark ? '#fff' : '#000';
        }
    };

    const resetForm = () => {
        setUserGoal('');
        setInjuries('');
        setWorkoutSchedule(null);
        setError('');
        setWorkoutStarted(false);
        setCurrentExercise(0);
        setSelectedExercises([]);
    };

    const startWorkout = () => {
        setWorkoutStarted(true);
        setCurrentExercise(0);
    };

    const nextExercise = () => {
        if (workoutSchedule && currentExercise < workoutSchedule.exercises.length - 1) {
            setCurrentExercise(currentExercise + 1);
        } else if (workoutSchedule && currentExercise === workoutSchedule.exercises.length - 1) {
            Alert.alert('Workout Complete!', 'Great job finishing your workout!');
            setWorkoutStarted(false);
            setCurrentExercise(0);
        }
    };

    const previousExercise = () => {
        if (currentExercise > 0) {
            setCurrentExercise(currentExercise - 1);
        }
    };

    const toggleExerciseSelection = (index: number) => {
        setSelectedExercises(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const openTaskModal = () => {
        if (selectedExercises.length === 0) {
            Alert.alert('No Exercises Selected', 'Please select at least one exercise to save to tasks.');
            return;
        }
        setShowTaskModal(true);
        setError('');
    };

    const saveToTasks = async () => {
        if (!workoutSchedule || selectedExercises.length === 0) {
            Alert.alert('Error', 'Please select at least one exercise to save.');
            return;
        }

        setIsSavingToTasks(true);
        try {
            const api = withAuth(session.access_token);
            const selectedExerciseData = selectedExercises.map(index => workoutSchedule.exercises[index]);

            await api.saveWorkoutToTasks(
                workoutSchedule.title,
                selectedExerciseData,
                taskDeadline || null
            );

            setShowTaskModal(false);
            setSelectedExercises([]);
            setTaskDeadline('');
            setError('');

            Alert.alert('Success', 'Workout exercises saved to tasks!', [
                { text: 'OK', onPress: () => router.push('/') }
            ]);
        } catch (err) {
            Alert.alert('Error', 'Failed to save exercises to tasks.');
        } finally {
            setIsSavingToTasks(false);
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: isDark ? '#000' : '#fff',
                paddingTop: insets.top + 10
            }}
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
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
                marginBottom: 8,
                color: isDark ? '#fff' : '#000'
            }}>
                Exercise Training Platform
            </Text>

            <Text style={{
                fontSize: 16,
                marginBottom: 24,
                color: isDark ? '#aaa' : '#666'
            }}>
                Generate personalized, AI-powered workout routines tailored to your fitness goals
            </Text>

            {!workoutSchedule ? (
                /* Configuration Form */
                <View>
                    {/* Primary Goal */}
                    <Text style={{
                        color: isDark ? '#fff' : '#000',
                        marginBottom: 8,
                        fontWeight: '600',
                        fontSize: 16
                    }}>
                        Primary Training Objective *
                    </Text>
                    <TextInput
                        value={userGoal}
                        onChangeText={setUserGoal}
                        placeholder="Describe your specific fitness goals..."
                        placeholderTextColor={isDark ? '#888' : '#999'}
                        multiline
                        numberOfLines={4}
                        maxLength={300}
                        style={{
                            borderWidth: 1,
                            borderColor: isDark ? '#333' : '#ddd',
                            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                            color: isDark ? '#fff' : '#000',
                            padding: 12,
                            marginBottom: 4,
                            borderRadius: 8,
                            minHeight: 100,
                            textAlignVertical: 'top',
                            fontSize: 16
                        }}
                    />
                    <Text style={{ fontSize: 12, color: isDark ? '#888' : '#666', marginBottom: 20, textAlign: 'right' }}>
                        {userGoal.length}/300
                    </Text>

                    {/* Fitness Level */}
                    <Text style={{
                        color: isDark ? '#fff' : '#000',
                        marginBottom: 8,
                        fontWeight: '600',
                        fontSize: 16
                    }}>
                        Current Fitness Level
                    </Text>
                    {fitnessLevels.map((level) => (
                        <TouchableOpacity
                            key={level.value}
                            onPress={() => setFitnessLevel(level.value)}
                            style={{
                                borderWidth: 2,
                                borderColor: fitnessLevel === level.value ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#333' : '#ddd'),
                                backgroundColor: fitnessLevel === level.value ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#1a1a1a' : '#f5f5f5'),
                                padding: 12,
                                borderRadius: 8,
                                marginBottom: 8
                            }}
                        >
                            <Text style={{
                                color: fitnessLevel === level.value ? '#fff' : (isDark ? '#fff' : '#000'),
                                fontWeight: '600',
                                marginBottom: 4
                            }}>
                                {level.label}
                            </Text>
                            <Text style={{
                                color: fitnessLevel === level.value ? '#fff' : (isDark ? '#aaa' : '#666'),
                                fontSize: 12
                            }}>
                                {level.description}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {/* Workout Type */}
                    <Text style={{
                        color: isDark ? '#fff' : '#000',
                        marginTop: 16,
                        marginBottom: 8,
                        fontWeight: '600',
                        fontSize: 16
                    }}>
                        Training Focus
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {workoutTypes.map((type) => (
                            <TouchableOpacity
                                key={type.value}
                                onPress={() => setWorkoutType(type.value)}
                                style={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                    borderWidth: 2,
                                    borderColor: workoutType === type.value ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#333' : '#ddd'),
                                    backgroundColor: workoutType === type.value ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#1a1a1a' : '#f5f5f5'),
                                }}
                            >
                                <Text style={{
                                    color: workoutType === type.value ? '#fff' : (isDark ? '#fff' : '#000'),
                                    fontWeight: '500',
                                    fontSize: 13
                                }}>
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Duration */}
                    <Text style={{
                        color: isDark ? '#fff' : '#000',
                        marginBottom: 8,
                        fontWeight: '600',
                        fontSize: 16
                    }}>
                        Session Duration
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {timeOptions.map((time) => (
                            <TouchableOpacity
                                key={time}
                                onPress={() => setAvailableTime(time)}
                                style={{
                                    flex: 1,
                                    minWidth: 70,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    borderWidth: 2,
                                    borderColor: availableTime === time ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#333' : '#ddd'),
                                    backgroundColor: availableTime === time ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#1a1a1a' : '#f5f5f5'),
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    color: availableTime === time ? '#fff' : (isDark ? '#fff' : '#000'),
                                    fontWeight: '600'
                                }}>
                                    {time}min
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Equipment */}
                    <Text style={{
                        color: isDark ? '#fff' : '#000',
                        marginBottom: 8,
                        fontWeight: '600',
                        fontSize: 16
                    }}>
                        Available Equipment
                    </Text>
                    {equipmentOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => setEquipment(option.value)}
                            style={{
                                borderWidth: 2,
                                borderColor: equipment === option.value ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#333' : '#ddd'),
                                backgroundColor: equipment === option.value ? (isDark ? '#422ad5' : '#f88f07') : (isDark ? '#1a1a1a' : '#f5f5f5'),
                                padding: 12,
                                borderRadius: 8,
                                marginBottom: 8
                            }}
                        >
                            <Text style={{
                                color: equipment === option.value ? '#fff' : (isDark ? '#fff' : '#000'),
                                fontWeight: '500'
                            }}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {/* Injuries */}
                    <Text style={{
                        color: isDark ? '#fff' : '#000',
                        marginTop: 16,
                        marginBottom: 8,
                        fontWeight: '600',
                        fontSize: 16
                    }}>
                        Injury History (Optional)
                    </Text>
                    <TextInput
                        value={injuries}
                        onChangeText={setInjuries}
                        placeholder="List any injuries or limitations..."
                        placeholderTextColor={isDark ? '#888' : '#999'}
                        multiline
                        numberOfLines={3}
                        maxLength={200}
                        style={{
                            borderWidth: 1,
                            borderColor: isDark ? '#333' : '#ddd',
                            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                            color: isDark ? '#fff' : '#000',
                            padding: 12,
                            marginBottom: 24,
                            borderRadius: 8,
                            minHeight: 80,
                            textAlignVertical: 'top',
                            fontSize: 16
                        }}
                    />

                    {/* Error Display */}
                    {error && (
                        <View style={{
                            backgroundColor: '#ef4444',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 16
                        }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>{error}</Text>
                        </View>
                    )}

                    {/* Generate Button */}
                    <TouchableOpacity
                        onPress={generateWorkout}
                        disabled={isLoading || !userGoal.trim()}
                        style={{
                            backgroundColor: isLoading || !userGoal.trim() ? '#999' : (isDark ? '#422ad5' : '#f88f07'),
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 8
                        }}
                    >
                        {isLoading && <ActivityIndicator color="#fff" />}
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                            {isLoading ? 'Generating Workout...' : 'Generate Workout Plan'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                /* Workout Display */
                <View>
                    {/* Workout Overview */}
                    <View style={{
                        backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                        padding: 16,
                        borderRadius: 12,
                        marginBottom: 16
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: isDark ? '#fff' : '#000',
                            marginBottom: 8
                        }}>
                            {workoutSchedule.title}
                        </Text>
                        <Text style={{
                            color: isDark ? '#aaa' : '#666',
                            marginBottom: 12,
                            lineHeight: 20
                        }}>
                            {workoutSchedule.description}
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                            <View style={{ backgroundColor: isDark ? '#422ad5' : '#f88f07', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{workoutSchedule.duration}</Text>
                            </View>
                            <View style={{ backgroundColor: '#10b981', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{workoutSchedule.totalCaloriesBurned} cal</Text>
                            </View>
                            <View style={{ backgroundColor: '#f59e0b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{workoutSchedule.exercises.length} exercises</Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={{ gap: 8 }}>
                            {!workoutStarted && (
                                <>
                                    <TouchableOpacity
                                        onPress={startWorkout}
                                        style={{
                                            backgroundColor: '#10b981',
                                            padding: 12,
                                            borderRadius: 8,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: '600' }}>▶ Start Workout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={openTaskModal}
                                        disabled={selectedExercises.length === 0}
                                        style={{
                                            backgroundColor: selectedExercises.length === 0 ? '#999' : (isDark ? '#422ad5' : '#f88f07'),
                                            padding: 12,
                                            borderRadius: 8,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: '600' }}>
                                            Save to Tasks ({selectedExercises.length})
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                            <TouchableOpacity
                                onPress={resetForm}
                                style={{
                                    borderWidth: 1,
                                    borderColor: isDark ? '#333' : '#ddd',
                                    padding: 12,
                                    borderRadius: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: '600' }}>Create New Plan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {workoutStarted ? (
                        /* Active Workout Mode */
                        <View style={{
                            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                            padding: 16,
                            borderRadius: 12
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: isDark ? '#fff' : '#000'
                                }}>
                                    Active Workout
                                </Text>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: isDark ? '#aaa' : '#666'
                                }}>
                                    {currentExercise + 1} / {workoutSchedule.exercises.length}
                                </Text>
                            </View>

                            {workoutSchedule.exercises[currentExercise] && (
                                <View>
                                    <Text style={{
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        color: isDark ? '#fff' : '#000',
                                        marginBottom: 12
                                    }}>
                                        {workoutSchedule.exercises[currentExercise].name}
                                    </Text>
                                    <Text style={{
                                        color: isDark ? '#aaa' : '#666',
                                        marginBottom: 16,
                                        lineHeight: 22
                                    }}>
                                        {workoutSchedule.exercises[currentExercise].description}
                                    </Text>

                                    <View style={{
                                        backgroundColor: isDark ? '#222' : '#fff',
                                        padding: 16,
                                        borderRadius: 8,
                                        marginBottom: 20
                                    }}>
                                        <Text style={{
                                            color: isDark ? '#fff' : '#000',
                                            fontSize: 16,
                                            marginBottom: 8
                                        }}>
                                            <Text style={{ fontWeight: '600' }}>Sets:</Text> {workoutSchedule.exercises[currentExercise].sets}
                                        </Text>
                                        <Text style={{
                                            color: isDark ? '#fff' : '#000',
                                            fontSize: 16
                                        }}>
                                            <Text style={{ fontWeight: '600' }}>Reps:</Text> {workoutSchedule.exercises[currentExercise].reps}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', gap: 8 }}>
                                        <TouchableOpacity
                                            onPress={previousExercise}
                                            disabled={currentExercise === 0}
                                            style={{
                                                flex: 1,
                                                borderWidth: 1,
                                                borderColor: isDark ? '#333' : '#ddd',
                                                padding: 14,
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                opacity: currentExercise === 0 ? 0.5 : 1
                                            }}
                                        >
                                            <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: '600' }}>← Previous</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={nextExercise}
                                            style={{
                                                flex: 1,
                                                backgroundColor: isDark ? '#422ad5' : '#f88f07',
                                                padding: 14,
                                                borderRadius: 8,
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontWeight: '600' }}>
                                                {currentExercise === workoutSchedule.exercises.length - 1 ? 'Complete ✓' : 'Next →'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : (
                        /* Exercise List */
                        <View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: isDark ? '#fff' : '#000',
                                marginBottom: 12
                            }}>
                                Exercise Protocol
                            </Text>
                            {workoutSchedule.exercises.map((exercise, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => toggleExerciseSelection(index)}
                                    style={{
                                        backgroundColor: selectedExercises.includes(index)
                                            ? (isDark ? '#1e3a5f' : '#dbeafe')
                                            : (isDark ? '#1a1a1a' : '#f5f5f5'),
                                        padding: 16,
                                        borderRadius: 12,
                                        marginBottom: 12,
                                        borderWidth: 2,
                                        borderColor: selectedExercises.includes(index) ? (isDark ? '#422ad5' : '#f88f07') : 'transparent'
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: isDark ? '#fff' : '#000',
                                        marginBottom: 4
                                    }}>
                                        {exercise.name}
                                    </Text>
                                    <Text style={{
                                        color: isDark ? '#aaa' : '#666',
                                        fontSize: 13,
                                        marginBottom: 8
                                    }} numberOfLines={2}>
                                        {exercise.description}
                                    </Text>
                                    <View style={{ flexDirection: 'row', gap: 12 }}>
                                        <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: '600' }}>
                                            {exercise.sets} sets
                                        </Text>
                                        <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: '600' }}>
                                            {exercise.reps} reps
                                        </Text>
                                        <Text style={{ color: getDifficultyColor(exercise.difficulty), fontWeight: '600' }}>
                                            {exercise.difficulty}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Training Tips */}
                    {workoutSchedule.tips && workoutSchedule.tips.length > 0 && (
                        <View style={{
                            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                            padding: 16,
                            borderRadius: 12,
                            marginTop: 16
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: isDark ? '#fff' : '#000',
                                marginBottom: 12
                            }}>
                                Training Tips
                            </Text>
                            {workoutSchedule.tips.map((tip, index) => (
                                <View key={index} style={{ flexDirection: 'row', marginBottom: 12, gap: 8 }}>
                                    <Text style={{ color: isDark ? '#422ad5' : '#f88f07', fontSize: 18 }}>✓</Text>
                                    <Text style={{
                                        flex: 1,
                                        color: isDark ? '#aaa' : '#666',
                                        lineHeight: 20
                                    }}>
                                        {tip}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}

            {/* Task Save Modal */}
            <Modal
                visible={showTaskModal}
                transparent
                animationType="fade"
                onRequestClose={() => !isSavingToTasks && setShowTaskModal(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
                    <View style={{
                        backgroundColor: isDark ? '#1a1a1a' : '#fff',
                        borderRadius: 12,
                        padding: 20
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: isDark ? '#fff' : '#000',
                            marginBottom: 12
                        }}>
                            Save Exercises to Tasks
                        </Text>
                        <Text style={{
                            color: isDark ? '#aaa' : '#666',
                            marginBottom: 20
                        }}>
                            You're about to save {selectedExercises.length} exercise{selectedExercises.length !== 1 ? 's' : ''} to your task list.
                        </Text>

                        <Text style={{
                            color: isDark ? '#fff' : '#000',
                            marginBottom: 8,
                            fontWeight: '600'
                        }}>
                            Deadline (Optional)
                        </Text>
                        <TextInput
                            value={taskDeadline}
                            onChangeText={setTaskDeadline}
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor={isDark ? '#888' : '#999'}
                            style={{
                                borderWidth: 1,
                                borderColor: isDark ? '#333' : '#ddd',
                                backgroundColor: isDark ? '#222' : '#f5f5f5',
                                color: isDark ? '#fff' : '#000',
                                padding: 12,
                                borderRadius: 8,
                                marginBottom: 20
                            }}
                        />

                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowTaskModal(false);
                                    setTaskDeadline('');
                                }}
                                disabled={isSavingToTasks}
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: isDark ? '#333' : '#ddd',
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: '600' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={saveToTasks}
                                disabled={isSavingToTasks}
                                style={{
                                    flex: 1,
                                    backgroundColor: isSavingToTasks ? '#999' : (isDark ? '#422ad5' : '#f88f07'),
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 8
                                }}
                            >
                                {isSavingToTasks && <ActivityIndicator color="#fff" size="small" />}
                                <Text style={{ color: '#fff', fontWeight: '600' }}>
                                    {isSavingToTasks ? 'Saving...' : 'Save to Tasks'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}