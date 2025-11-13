import {Slot} from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./globals.css";


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
