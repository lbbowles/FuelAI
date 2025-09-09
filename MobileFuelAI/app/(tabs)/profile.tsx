import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
    Text,
    useColorScheme,
    View,
    ScrollView,
    Alert,
    Button,
    Image,
} from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { icons } from "@/constants/icons";

export default function App() {
    const isDark = useColorScheme() === "dark";

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const [isChecked4, setChecked4] = useState(false);
    const [isChecked5, setChecked5] = useState(false);


    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <ScrollView
                className={`flex-1 ${isDark ? "bg-primary" : "bg-secondary"} px-6 py-12`}
                contentContainerClassName="items-center"
            >

                <Image source={icons.logo} className="w-14 h-14 mt-16 mx-auto" />

                <View className="w-full max-w-md space-y-10">
                    <Text
                        className={`text-2xl font-bold text-center ${isDark ? 'text-secondary' : 'text-primary'}`}
                    >
                        {"\n"} Recipe Preferences
                    </Text>

                    {/* === Cluster 1 === */}
                    <View
                        className={`rounded-2xl p-4 border space-y-4 ${
                            isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"
                        }`}
                    >
                        <Text
                            className={`text-xl font-semibold mb-2 ${
                                isDark ? 'text-secondary' : 'text-primary'
                            }`}
                        >
                            Dietary Requirements
                        </Text>

                        <View className="flex-row items-center">
                            <Checkbox
                                className="mr-5"
                                value={isChecked1}
                                onValueChange={setChecked1}
                                color={isChecked1 ? '#491ebb' : undefined}
                            />
                            <Text className={`${isDark ? 'text-secondary' : 'text-primary'}`}>
                                Vegan
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Checkbox
                                className="mr-5"
                                value={isChecked2}
                                onValueChange={setChecked2}
                                color={isChecked2 ? '#491ebb' : undefined}
                            />
                            <Text className={`${isDark ? 'text-secondary' : 'text-primary'}`}>
                                Vegetarian
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Checkbox
                                className="mr-5"
                                value={isChecked3}
                                onValueChange={setChecked3}
                                color={isChecked3 ? '#491ebb' : undefined}
                            />
                            <Text className={`${isDark ? 'text-secondary' : 'text-primary'}`}>
                                Gluten-Free
                            </Text>
                        </View>
                    </View>

                    {/* === Cluster 2 === */}
                    <View
                        className={`rounded-2xl p-4 border space-y-4 ${
                            isDark ? "bg-secondary/10 border-secondary/15" : "bg-primary/5 border-primary/10"
                        }`}
                    >
                        <Text
                            className={`text-xl font-semibold mb-2 ${
                                isDark ? 'text-secondary' : 'text-primary'
                            }`}
                        >
                            Meal Preferences
                        </Text>

                        <View className="flex-row items-center">
                            <Checkbox
                                className="mr-5"
                                value={isChecked4}
                                onValueChange={setChecked4}
                                color={isChecked4 ? '#491ebb' : undefined}
                            />
                            <Text className={`${isDark ? 'text-secondary' : 'text-primary'}`}>
                                Keto
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Checkbox
                                className="mr-5"
                                value={isChecked5}
                                onValueChange={setChecked5}
                                color={isChecked5 ? '#491ebb' : undefined}
                            />
                            <Text className={`${isDark ? 'text-secondary' : 'text-primary'}`}>
                                Paleo
                            </Text>
                        </View>
                    </View>

                    {/* Update Button */}
                    <Button title="Update" onPress={() => Alert.alert("Success!")} />
                </View>
            </ScrollView>
        </ThemeProvider>
    );
}
