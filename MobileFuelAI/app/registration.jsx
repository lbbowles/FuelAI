import {
    ScrollView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    useColorScheme,
    Alert,
    ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import { Redirect, router } from 'expo-router';
import {icons} from "../constants/icons";
import { images } from '../constants/images';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
// API services.
import { useAuth } from './context/AuthContext.js';

// Register account page
export default function CreateAccount() {
    // all AuthContext hook to utilize function and variable
    const {session, signup} = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    // Register handler
    const handleSubmit = async () => {
        // Make sure all fields have been sufficed.
        if (!username || !email || !password || !passwordConfirmation) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Password match check
        if (password !== passwordConfirmation) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        // Attempt to take user information and register.
        try {
            console.log('Registration attempted:', username, email);
            // AuthContext function call.
            await signup({ username, email, password });
            console.log('Registration successful:', email);

            // Navigate to tabs
            router.replace('/(tabs)');
        } catch (error) {
            // If failed, throw error.
            console.error('Registration failed:', error);
            Alert.alert('Registration Failed', error.message || 'An error occurred during registration');
        } finally {
            // Set loading false again
            setLoading(false);
        }
    };

    const isDark = useColorScheme() === "dark";

    // Redirect to tabs if a session already exists.
    if (session) return <Redirect href="/(tabs)" />;

    // Set a background.
    const trueBackground = isDark ? images.darkBackground : images.lightBackground;

    // Redirect to tabs if already signed in.
    if (session) return <Redirect href="/(tabs)" />;

    return (
        // wrap in dark if dark mode is enabled
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>

            {/*Actually place the background*/}
            <ImageBackground
                source={trueBackground}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
            <Image source={icons.logo} className="w-14 h-14 mt-16 mx-auto" />

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
                            Create Account
                        </Text>

                    {/* Username field */}
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: isDark ? '#ffffff' : '#000000'
                        }}>
                            Username:
                        </Text>

                    <TextInput
                        placeholder="Enter your username..."
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize="none"
                    />

                    {/* Email field */}
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: isDark ? '#ffffff' : '#000000'
                        }}>
                            Email:
                        </Text>

                    <TextInput
                        placeholder="Enter your email..."
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password field */}
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
                    />

                    {/* Password confirmation field */}
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginBottom: 5,
                            color: isDark ? '#ffffff' : '#000000'
                        }}>
                            Confirm Password:
                        </Text>

                    <TextInput
                        placeholder="Confirm your password..."
                        value={passwordConfirmation}
                        onChangeText={(text) => setPasswordConfirmation(text)}
                        secureTextEntry
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
                        }}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
                    </TouchableOpacity>

                    {/* If a user has an account, this will let them sign in */}
                    <View style={{marginTop: 20, alignItems: 'center'}}>
                        <Text style={{color: isDark ? '#ffffff' : '#000000'}}>
                            Have an account?
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/signin')}>
                            <Text style={{color: '#3b82f6', fontWeight: 'bold', marginTop: 5}}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            </ImageBackground>
        </ThemeProvider>
    );
}