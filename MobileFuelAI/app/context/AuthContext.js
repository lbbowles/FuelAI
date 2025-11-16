import { createContext, useState, useContext, useEffect } from 'react';
import {Text, SafeAreaView, Alert} from 'react-native';
// React native component; inexplicably useful for saving tokens (preventing sign in every time).
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import login api function call from authcontroller
import { register, login, withAuth } from '@/services/api';

const AuthContext = createContext();

// Any component within the wrapper can access the data.
const AuthProvider = ({ children }) => {
    // In order: load at start to do tasks, check if session exists, check if user exist, null = signed out.  No calls to backend yet.2
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [sessionVersion, setSessionVersion] = useState(0);

    // Run upon application loading.
    useEffect(() => {
        init();
    }, []);

    // init.  Happens on launch, checks to see if we are already authenticated with the function below it.
    const init = async () => {
        await checkAuth();
    };

    // The purpose is to check if user has stored "token"/session
    const checkAuth = async () => {
        try {
            // Try to get stored token and user from AsyncStorage
            const token = await AsyncStorage.getItem('access_token');
            const storedUser = await AsyncStorage.getItem('user');

            // If token and user exist, access them, if not sign in / registration is needed.
            if (token && storedUser) {
                setSession({ access_token: token });
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.log('Check auth error:', error);
        }

        // Upon locating session end loading return different view / tab.
        setLoading(false);
    };

    // Sign in with Railway API / call api.ts
    const signin = async ({login: loginValue, password}) => {
        setLoading(true);
        try {
            // Call Railway login API that we added, ascertain response.
            const response = await login(loginValue, password);
            console.log('Login response:', response);

            // Store token and user that were ascertained.
            await AsyncStorage.setItem('access_token', response.access_token);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));

            // Set session and user info from the previous information garnered from Railway API call.
            setSession({ access_token: response.access_token });
            setUser(response.user);
        } catch (error) {
            console.error('Sign in error:', error);
            Alert.alert(
                'Login Failed',
                'Invalid email or password. Please try again.',
                [{text: 'OK'}]);
        }
        // Set loading to false, show next route/tab/view.
        setLoading(false);
    };

    // Register a user, implement into Railway API + provide token for session.
    const signup = async ({username, email, password}) => {
        setLoading(true);
        try{
            // Ascertain from filled fields within registration.jsx
            const response = await register(username, email, password);
            console.log('Registration response:', response);

            // Store token and user that were ascertained.
            await AsyncStorage.setItem('access_token', response.access_token);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));

            // Set session and user state.
            setSession({ access_token: response.access_token });
            setUser(response.user);
            setSessionVersion(v => v + 1);

        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
        // Set loading to false.
        setLoading(false);
    }

    // Sign out.  Works exactly like the sign in but it doesn't have to call API
    const signout = async () => {
        setLoading(true);
        try {
            // Clear stored data
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('user');

            setSession(null);
            setUser(null);
            setSessionVersion(v => v + 1);
        } catch (error) {
            console.error('Sign out error:', error);
        }
        // Set loading false.
        setLoading(false);
    };

    // Package session, user, signin function, signup function, signout function
    const contextData = { session, user, signin, signup, signout, sessionVersion};

    // show loading screen if loading, show the rest of the app... children.
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView>
                    <Text>Loading...</Text>
                </SafeAreaView>
            ) : (
                // If not loading, then show the application.
                children
            )}
        </AuthContext.Provider>
    );
};

// Hook for easier utilization in other routes.  Allows useAuth() instead of longer more arduous call.
const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
export default AuthContext;