import { View, Image, StyleSheet } from "react-native";

import { Content } from "@components/Content";

import { Slider } from "./Slider";

import theme from "@theme";
import { useSharedValue, useAnimatedReaction } from "react-native-reanimated";

export default function Alone() {
    const progress = useSharedValue(0);

    useAnimatedReaction(
        () => progress.value,
        (n) => {
            console.warn("progress: ", n);
        }
    );

    return (
        <View style={styles.container}>
            <Content title="TU TE SENS SEUL.E ?" />
            <Image source={require("@assets/images/project/seul.png")} />
            <Slider progress={progress} style={{ flex: 1 }} />
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
