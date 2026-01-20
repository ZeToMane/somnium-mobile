import BorderButton from "@components/icons/BorderButton";
import global from "@styles/global";
import theme from "@theme";
import { Pressable, StyleSheet, Text } from "react-native";
import { useScenePoint } from "@/context/ScenePoints";
import { Href, useRouter } from "expo-router";

interface ButtonProps {
    text?: string;
    navigateTo?: string;
    incrementPoints?: number;
    customCallback?: () => void;
}

export function Button({
    text = "CONTINUER",
    navigateTo,
    incrementPoints,
    customCallback,
}: ButtonProps) {
    const router = useRouter();

    const { increment } = useScenePoint();

    const handlePress = () => {
        if (incrementPoints) {
            increment(incrementPoints);
        }

        if (customCallback) {
            customCallback();
        }

        if (navigateTo) {
            router.push(navigateTo as Href);
        }
    };
    return (
        <Pressable
            onPress={handlePress}
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
