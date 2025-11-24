import {Slot} from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./globals.css";


// Wrap application in authentication, since data is different per user but we also want users to not have to sign in everytime.

function AppContent() {
    const { sessionVersion } = useAuth();
    return <Slot key={sessionVersion} />;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
