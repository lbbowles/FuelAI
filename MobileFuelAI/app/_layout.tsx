import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
      <Stack>

          {/*// Hide folder headers*/}

          <Stack.Screen
            name="(tabs)"
            options = {{ headerShown: false }}
          />


        <Stack.Screen
        name={"recipes/[id]"}
        options={{ headerShown: false }}
        />

      </Stack>);
}
