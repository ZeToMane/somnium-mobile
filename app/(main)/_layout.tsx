import theme from "@theme";

import { Slot } from "expo-router";

import { StyleSheet, View } from "react-native";

export default function MainLayout() {
    return (
        <View style={styles.container}>
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: theme.main.paddingHorizontal,
        paddingVertical: theme.main.paddingVertical,
        boxSizing: "border-box",
    },
});
