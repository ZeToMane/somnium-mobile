import global from "@styles/global";
import { StyleSheet, Text, View } from "react-native";

export function Desc() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={global.note}>IP: 193.44.3464</Text>
                <Text style={global.note}>MAC: 3F:9A:11:CD</Text>
                <Text style={global.note}>STATUS: ACTIVE</Text>
            </View>
            <View style={styles.content}>
                <Text style={global.note}>IP: 193.44.3464</Text>
                <Text style={global.note}>ACCESS: GARANTED</Text>
                <Text style={global.note}>SESSION: 00:00:01</Text>
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
        gap: 10,
    },
    content: {
        width: "auto",
        height: "auto",
        flexDirection: "column",
    },
});
