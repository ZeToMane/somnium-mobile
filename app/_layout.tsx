import theme from "@theme";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
            <View style={styles.container}>
                <Slot />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: theme.main.paddingHorizontal,
        paddingVertical: theme.main.paddingVertical,
        boxSizing: "border-box",
    },
});
