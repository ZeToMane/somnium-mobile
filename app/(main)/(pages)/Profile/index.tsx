import theme from "@theme";

import { StyleSheet, View } from "react-native";

import { Content } from "@/components/Content";

import { Button } from "@/components/Button";
import { Status } from "@/components/Status";
import { Username } from "@/components/Username";

import { useProgression } from "@/context/Progression";
import { useEffect } from "react";

export default function Profile() {
    const { setStep } = useProgression();

    useEffect(() => {
        setStep(2);
    }, [setStep]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Content title={"MISE À JOUR DU PROFIL"} />
                <Username />
            </View>
            <Button navigateTo="See" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        gap: theme.spacing.lg,
    },
    content: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: theme.spacing.lg,
    },
});
