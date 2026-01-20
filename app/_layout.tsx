import theme from "@theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressionProvider } from "@context/Progression";
import { ScenePointsProvider } from "@context/ScenePoints";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Gridlite: require("@fonts/gridlite-pe-variable.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
            <ProgressionProvider>
                <ScenePointsProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: "none",
                            contentStyle: {
                                backgroundColor: theme.colors.background,
                            },
                        }}
                    />
                </ScenePointsProvider>
            </ProgressionProvider>
        </SafeAreaView>
    );
}
