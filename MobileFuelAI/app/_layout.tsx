import { Slot } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

// wraps the entire app in authentication context and dynamically renders the correct route using Expo Router's

export default function RootLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
