import global from "@styles/global";
import theme from "@theme";
import { StyleSheet, Text, View } from "react-native";

export function Title() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={[global.body, { color: theme.colors.background }]}>
                    SOMNIUM 345-457/3034
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
        backgroundColor: theme.colors.content,
        marginLeft: -theme.main.paddingHorizontal,
        marginRight: theme.main.paddingHorizontal,
        paddingLeft: theme.main.paddingHorizontal,
    },
    content: {
        width: "auto",
        height: "auto",
        flexDirection: "row",
        gap: 10,
    },
});
