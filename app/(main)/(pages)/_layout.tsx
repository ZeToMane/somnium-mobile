import theme from "@theme";

import { Slot } from "expo-router";

import { StyleSheet, View } from "react-native";

import { Header } from "@/components/Header";
import { ProgressionCounter } from "@/components/ProgressionCounter";

import { useProgression } from "@/context/Progression";
import { useEffect } from "react";

export default function MainLayout() {
    const { step, progression, setStep, incrementProgression } =
        useProgression();

    useEffect(() => {
        setStep(3);
        incrementProgression();
    }, [incrementProgression, setStep]);

    return (
        <View style={styles.container}>
            <Header steps={step} />
            <ProgressionCounter progression={progression} />
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /* justifyContent: "center",
        alignItems: "center", */
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
    },
});
