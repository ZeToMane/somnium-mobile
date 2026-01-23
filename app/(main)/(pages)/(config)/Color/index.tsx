import { View, Image, StyleSheet } from "react-native";

import { Content } from "@components/Content";
import { Button } from "@components/Button";

import { ColorGrid } from "./ColorGrid";

import theme from "@theme";

export default function Alone() {
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content title="CHOISIS UNE COULEUR" />
                <ColorGrid />
            </View>
            <Button navigateTo="See" />
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
