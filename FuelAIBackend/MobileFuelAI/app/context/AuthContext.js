import { createContext, useState, useContext, useEffect } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { account } from '@/lib/appwriteConfig.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Immediately place into loading state to confirm session status.
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        init();
    }, []);

    //Anything that is desired to be loaded on initial app load, we load with this function.
    const init = async () => {
        checkAuth();
    };

    //Pull data from appwrite backend to determine if user already has a session.
    const checkAuth = async () => {
        try{
            const responseSession = await account.getSession('current');
            setSession(responseSession);

            // Get current user--if there is one.
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    //Functionality to actually sign in and sign out; builds off of appwriteConfig.js
    const signin = async ({email, password}) => {
        setLoading(true);
        try{
            //Passed in from the form
            const responseSession = await account.createEmailPasswordSession(
                email, password);
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    };
    const signout = async () => {};
    //Not implemented.
    const signup = async () => {};

    const contextData = { session, user, signin, signout };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView>
                    <Text>Loading...</Text>
                </SafeAreaView>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
export default AuthContext;
