import React from 'react';
import {
    Image,
    ImageSourcePropType,
    useColorScheme,
    StyleSheet
} from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useAuth } from '@/app/context/AuthContext.js';
import { icons } from '@/constants/icons';

const TabIcon = ({
                     source,
                     focused,
                 }: {
    source: ImageSourcePropType;
    focused: boolean;
}) => (
    <Image
        source={source}
        style={{
            width: 24,
            height: 24,
            tintColor: focused ? '#030014' : '#9CA4AB',
        }}
        resizeMode="contain"
    />
);

const AuthenticatedLayout = () => {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Tabs
                initialRouteName="mealPlans"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: colorScheme === "dark" ? '#e8e5e3' : '#030014',
                    tabBarInactiveTintColor: colorScheme === "dark" ? '#9CA4AB' : '#221F3D',
                    tabBarStyle: {
                        backgroundColor: colorScheme === "dark" ? '#0F0D23' : '#e8e5e3',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon source={icons.home} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: "Calendar",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon source={icons.calendar} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="mealPlans"
                    options={{
                        title: "Plans",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon source={icons.user} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="forum"
                    options={{
                        title: "Forum",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon source={icons.forum} focused={focused} />
                        ),
                    }}
                />
            </Tabs>
        </ThemeProvider>
    );
};

// Recent Implementation since last push; check if there is a session (corresponds to AuthContext file), if not, redirect.

export default function Layout() {
    const { session } = useAuth();
    return session ? <AuthenticatedLayout /> : <Redirect href="/signin" />;
}

const styles = StyleSheet.create({});
