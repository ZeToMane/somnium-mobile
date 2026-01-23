import BorderButton from "@components/icons/BorderButton";
import global from "@styles/global";
import theme from "@theme";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSocket } from "@/context/Socket";
import { Href, useRouter } from "expo-router";

interface ButtonProps {
    text?: string;
    navigateTo?: string;
    sceneTo?: string;
    customCallback?: () => void;
}

export function Button({
    text = "CONTINUER",
    navigateTo,
    sceneTo,
    customCallback,
}: ButtonProps) {
    const router = useRouter();
    const { socket } = useSocket();

    const handlePress = () => {
        if (customCallback) {
            customCallback();
        }

        if (sceneTo) {
            console.warn("sceneTo: ", sceneTo);
            socket.current?.emit("message-from-mobile", {
                text: { sceneTo },
            });
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
