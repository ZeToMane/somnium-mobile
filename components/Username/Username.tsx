import { StyleSheet, TextInput, Text, View } from "react-native";

import global from "@styles/global";
import theme from "@theme";

export function Username() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text
                        style={[
                            global.note,
                            { color: theme.colors.background },
                        ]}
                    >
                        YOUR NAME
                    </Text>
                </View>
            </View>
            <TextInput
                style={styles.input}
                defaultValue=""
                placeholderTextColor={theme.colors.content}
                cursorColor={theme.colors.focus}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: theme.colors.content,
        paddingTop: theme.spacing.md / 2,
        paddingBottom: theme.spacing.md / 2,
        paddingRight: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        ...global.body,
    },
    header: {
        height: "auto",
        justifyContent: "flex-start",
        flexDirection: "row",
        backgroundColor: theme.colors.content,
        marginLeft: -theme.main.paddingHorizontal,
        marginRight: theme.main.paddingHorizontal,
        paddingLeft: theme.main.paddingHorizontal,
    },
    headerContent: {
        width: "auto",
        height: "auto",
        flexDirection: "row",
        gap: 10,
        paddingRight: theme.spacing.sm,
    },
});
