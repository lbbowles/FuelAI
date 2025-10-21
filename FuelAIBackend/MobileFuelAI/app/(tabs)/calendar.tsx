import React, { useState } from "react";
import {Image, ScrollView, Text, TouchableOpacity, useColorScheme} from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { icons } from "@/constants/icons";
import {Calendar} from 'react-native-calendars';
import {Link} from "expo-router";

const UserCalendar = () => {

    // Store currently selected date
    const [selected, setSelected] = useState('');
    const isDark = useColorScheme() === "dark";

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <ScrollView
                className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"} px-6 py-12`}
                contentContainerClassName="items-center"
            >
                <Image source={icons.logo} className="w-14 h-14 mt-16 mx-auto" />

                {/*Using element from react-native-calendars, easily select a date and place in variable*/}
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: {selected: true, disableTouchEvent: true}
                    }}
                />

                {/*Go to date route and pass in selected date as a parameter*/}
                <Link href={`/food/${selected}`} asChild>
                    <TouchableOpacity
                        className="rounded-2xl px-4 py-4"
                        style={{
                            backgroundColor: isDark ? "#ffffff1a" : "#0000000d",
                            borderWidth: 1
                        }}
                    >
                        <Text className={`text-lg font-semibold ${isDark ? "text-secondary" : "text-primary"}`}>
                            See meals for {selected}
                        </Text>
                    </TouchableOpacity>
                </Link>


            </ScrollView>
        </ThemeProvider>

    );
};

export default UserCalendar;