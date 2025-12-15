import BorderButton from "@components/icons/BorderButton";
import global from "@styles/global";
import theme from "@theme";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
    text?: string;
    callback?: () => void;
}

export function Button({ text = "CONTINUER", callback }: ButtonProps) {
    return (
        <Pressable
            onPress={callback}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.containerPressed,
            ]}
        >
            <BorderButton />
            <Text style={[global.cta, styles.text]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.cta,
    },
    containerPressed: {
        backgroundColor: theme.colors.focus,
    },
    text: {
        width: "auto",
        height: "auto",
        textAlign: "center",
        color: theme.colors.background,
    },
});
