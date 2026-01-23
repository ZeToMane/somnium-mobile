import theme from "@theme";

import { StyleSheet, View } from "react-native";

import { Content } from "@/components/Content";

import { Button } from "@/components/Button";
import { Status } from "@/components/Status";

import { useProgression } from "@/context/Progression";
import { useEffect } from "react";

export default function Story() {
    const { setStep } = useProgression();

    useEffect(() => {
        setStep(1);
    }, [setStep]);

    return (
        <View style={styles.container}>
            <Status />
            <View style={{ flex: 1 }}>
                <Content
                    title={"WELCOME TO THE EXPERIENCE"}
                    desc={
                        "DANS UN MONDE OÙ RIEN NE SUBSISTE, VOUS DÉCOUVREZ UN ÉTRANGE APPAREIL: LE GÉNÉRATEUR DE RÊVES. IL SEMBLE RÉAGIR À VOS PENSÉES, À VOS ÉMOTIONS... PEUT-ÊTRE MÊME À VOS SOUVENIRS. RÉPONDEZ AUX QUESTIONS. FAÇONNEZ CE QUI RESTE. CRÉEZ CE QUI VOUS MANQUE.PENSÉES, À VOS ÉMOTIONS... PEUT-ÊTRE MÊME À VOS SOUVENIRS. RÉPONDEZ AUX QUESTIONS. FAÇONNEZ CE QUI RESTE. CRÉEZ CE QUI VOUS MANQUE."
                    }
                />
            </View>
            <Button navigateTo="Profile" />
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
});
