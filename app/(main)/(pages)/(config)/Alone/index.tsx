import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { Content } from "@components/Content";
import { Button } from "@components/Button";

import { Slider } from "./Slider";

import theme from "@theme";
import { useSharedValue, useAnimatedReaction } from "react-native-reanimated";
import { useRef } from "react";

const nav = ["Final"];

export default function Alone() {
    const progress = useSharedValue(0);
    const navIndex = useRef<number | null>(null);
    const sceneToValue = useRef<string | undefined>(undefined);

    useAnimatedReaction(
        () => progress.value,
        (n) => {
            console.warn("progress: ", n);

            if (n > 50) {
                navIndex.current = 0;
                sceneToValue.current = "CHATELET_BAKED";
            } else {
                navIndex.current = 0;
                sceneToValue.current = "METRO_BAKE_REMPLI";
            }
        }
    );

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content title="TU TE SENS SEUL.E ?" />
                <Image
                    source={require("@assets/images/project/seul.png")}
                    style={{ width: "100%", height: 240 }}
                    contentFit="contain"
                />
                <Slider progress={progress} style={{ flex: 1 }} />
            </View>
            <Button
                navigateTo={
                    navIndex.current !== null ? nav[navIndex.current] : ""
                }
                {...(sceneToValue.current && { sceneTo: sceneToValue.current })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        gap: theme.spacing.lg,
    },
});
