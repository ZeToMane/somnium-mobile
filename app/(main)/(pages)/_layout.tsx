import theme from "@theme";

import { Slot } from "expo-router";

import { StyleSheet, View } from "react-native";

import { Header } from "@/components/Header";
import { ProgressionCounter } from "@/components/ProgressionCounter";

import { useProgression } from "@/context/Progression";
import { useEffect } from "react";

export default function MainLayout() {
    const { step, progression, incrementProgression } = useProgression();

    useEffect(() => {
        if (step >= 4) {
            incrementProgression();
        }
    }, [incrementProgression, step]);

    return (
        <View style={styles.container}>
            <Header steps={step} />
            {step >= 4 && <ProgressionCounter progression={progression} />}
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        gap: theme.spacing.md,
    },
});
