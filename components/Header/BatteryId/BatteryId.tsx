import Battery from "@components/icons/Battery";
import global from "@styles/global";
import theme from "@theme";
import { StyleSheet, Text, View } from "react-native";

export function BatteryId() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Battery height={theme.fontSize.sm} />
                <Text style={global.body}>65%</Text>
                <Text style={global.body}>|</Text>
                <Text style={global.body}>345780</Text>
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
        flexDirection: "row",
        gap: 10,
    },
    text: {
        color: theme.colors.content,
        fontFamily: "Gridlite",
        fontSize: theme.fontSize.sm,
    },
});
