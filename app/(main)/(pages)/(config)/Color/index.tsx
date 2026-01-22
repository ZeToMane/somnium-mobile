import { View, Image, StyleSheet } from "react-native";

import { Content } from "@components/Content";

import { ColorGrid } from "./ColorGrid";

import theme from "@theme";

export default function Alone() {
    return (
        <View style={styles.container}>
            <Content title="CHOISIS UNE COULEUR" />
            <ColorGrid />
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
