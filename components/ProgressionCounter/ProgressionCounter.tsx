import global from "@styles/global";
import theme from "@theme";
import { StyleSheet, Text, View } from "react-native";

interface ProgressionCounterProps {
    progression: number;
}

export function ProgressionCounter({
    progression = 0,
}: ProgressionCounterProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={[global.note, { color: theme.colors.background }]}>
                    QUESTION {progression}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    content: {
        width: "auto",
        height: "auto",
        backgroundColor: theme.colors.content,
        marginLeft: -theme.main.paddingHorizontal,
        marginRight: theme.main.paddingHorizontal,
        paddingLeft: theme.main.paddingHorizontal,
        paddingRight: theme.spacing.sm,
        flexDirection: "row",
        gap: 10,
    },
});
