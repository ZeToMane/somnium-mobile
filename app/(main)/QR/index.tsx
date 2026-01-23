import theme from "@theme";

import { Slot } from "expo-router";

import { StyleSheet, View } from "react-native";

import { Header } from "@/components/Header";
import { ProgressionCounter } from "@/components/ProgressionCounter";
import { QRCode } from "@/components/QRCode";
import { Content } from "@/components/Content";
import Barcode from "@components/icons/Barcode";

import { useProgression } from "@/context/Progression";
import { useEffect } from "react";

export default function QR() {
    const { step, setStep } = useProgression();

    useEffect(() => {
        setStep(0);
    }, [setStep]);

    return (
        <View style={styles.container}>
            <Header steps={step} desc={false} />
            <Content
                title={"SCANNEZ VOTRE CODE UTILISATEUR"}
                desc={
                    "L’IDENTIFIANT QUE L’AGENT VOUS A DÉLIVRÉ POUR VOUS CONNECTER"
                }
            />
            <View style={{ width: "100%", flex: 1 }}>
                <QRCode nextPage="Story" />
            </View>
            <Barcode />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        gap: theme.spacing.md,
    },
});
