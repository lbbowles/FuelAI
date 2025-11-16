import {ImageBackground, ScrollView, View, TextInput, Text, TouchableOpacity, Image, useColorScheme, Alert} from 'react-native';
import React, { useState } from 'react';
// Important for authentication and persistence
import { useAuth } from './context/AuthContext.js';
import { Redirect, router } from 'expo-router';
import { icons } from "../constants/icons";
import { images } from '../constants/images';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';

// Sign in page
export default function SignIn() {
    // We are going to use the sign in function and the hook established in AuthContext to establish a session.
    const {session, signin} = useAuth();
    // Input values
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    // Local loading state for this sign-in form / button changes.
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Make sure all fields are filled, if not complain to the user with an alert (shout out to React Native)
        if (!loginValue || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // If filled, set loading to true so the button can be updated.
        setLoading(true);
        try {
            // We are obviously using signin function in AuthContext here, but that is really checking our API endpoint and information within DB on Railway
            await signin({login: loginValue, password});

            // Navigate to tabs on success / logged in.
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Sign-in failed:', error);
            Alert.alert('Sign In Failed', 'Invalid login credentials. Please try again.');
        } finally {
            // Reset loading state.
            setLoading(false);
        }
    };

    // Dark mode support as always
    const isDark = useColorScheme() === "dark";

    // Redirect to tabs if a session already exists.
    if (session) return <Redirect href="/(tabs)" />;

    // Set a background.
    const trueBackground = isDark ? images.darkBackground : images.lightBackground;

    // Otherwise show the login form.
    return (
        // Wrap with dark mode if applicable
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        {/*Actually place the background*/}
            <ImageBackground
                source={trueBackground}
                style={{ flex: 1 }}
                resizeMode="cover"
            >

            <Image source={icons.logo} className="w-20 h-20 mt-16 mx-auto" />

                <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 40 }}>
                    <View style={{
                        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 20,
                        padding: 24,
                        marginTop: 20,

                    }}>

                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 24,
                            color: isDark ? '#ffffff' : '#000000'
                        }}>
                            Sign In
                        </Text>

                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: isDark ? '#ffffff' : '#000000'
                        }}>
                            Email or Username:
                        </Text>

                    <TextInput
                        placeholder="Enter your email or username..."
                        value={loginValue}
                        onChangeText={(text) => setLoginValue(text)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{ color: isDark ? '#ffffff' : '#000000' }}
                    />

                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: isDark ? '#ffffff' : '#000000'
                        }}>
                            Password:
                        </Text>

                    <TextInput
                        placeholder="Enter your password..."
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={{ color: isDark ? '#ffffff' : '#000000' }}
                    />

                        {/*If loading, showcase one thing, if not then showcase the other*/}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 15,
                            color: '#3b82f6',
                        }}>
                            {loading ? 'Signing In...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    {/* If a user does not have an account, this is the route to registration */}
                    <View style={{marginTop: 20, alignItems: 'center'}}>
                        <Text style={{color: isDark ? '#ffffff' : '#000000'}}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/registration')}>
                            <Text style={{color: '#3b82f6', fontWeight: 'bold', marginTop: 5}}>
                                Create Account
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

                </ImageBackground>
        </ThemeProvider>
    );
}