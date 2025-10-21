import {ScrollView, View, TextInput, Text, TouchableOpacity, Image, useColorScheme} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext.js';
import { Redirect } from 'expo-router';
import {icons} from "../constants/icons";
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';

// Sign in page, uses context to sign in.
export default function SignIn() {
    const {session, signin} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Print to console and also call signin function.
    const handleSubmit = async () => {
        console.log('Sign-in attempted:', email, password);
        signin({email, password});
    };

    const isDark = useColorScheme() === "dark";

    // Redirect to tabs if already signed in.
    if (session) return <Redirect href="/(tabs)" />;

    return (

        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>

            <Image source={icons.logo} className="w-14 h-14 mt-16 mx-auto" />

        <ScrollView>

            {/*Simple sign in form, uses context to sign in.*/}
            <View>
            <Text>Sign In</Text>

            <Text>Email:</Text>
            <TextInput
                placeholder="Enter your email..."
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Text>Password:</Text>
            <TextInput
                placeholder="Enter your password..."
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity onPress={handleSubmit}>
                <Text >Sign In</Text>
            </TouchableOpacity>
            </View>

        </ScrollView>

        </ThemeProvider>
    );
}

