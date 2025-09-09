import {StyleSheet, Image, ImageSourcePropType, useColorScheme} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {icons} from "@/constants/icons";
import {
    ThemeProvider,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";

const TabIcon = ({
                     source,  // The icon to display
                     focused, // Is this tab currently selected?
                 }: {
    source: ImageSourcePropType;
    focused: boolean;
}) => (
    <Image
        source={source}
        // Fixed size, change color depending on whether it's focused or not.
        style={{
            width: 24,
            height: 24,
            tintColor: focused ? '#030014' : '#9CA4AB',
        }}
        // Maintain aspect ratio
        resizeMode="contain"
    />
);

const _layout = () => {
    const colorScheme = useColorScheme();

    return (
        // Wrap page in light / dark mode detection.
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tabs
            screenOptions={{
                // Hide header and tab bar labels.  May revert these later.
                headerShown: false,
                tabBarShowLabel: true,
                // Set label color depending on whether it's dark or light mode.'
                tabBarActiveTintColor: colorScheme === "dark" ? '#e8e5e3' : '#030014',
                tabBarInactiveTintColor: colorScheme === "dark" ? '#9CA4AB' : '#221F3D',
                // Set background color depending on whether it's dark or light mode.'
                tabBarStyle: {
                    backgroundColor: colorScheme === "dark" ? '#0F0D23' : '#e8e5e3',
                },
            }}
        >
            {/*https://docs.expo.dev/router/advanced/tabs/ is a CHEAT code*/}
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
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.calendar} focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"

                options={{
                    title: "Profile",
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

export default _layout

const styles = StyleSheet.create({})