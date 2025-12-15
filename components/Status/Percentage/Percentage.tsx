import global from "@styles/global";
import { StyleSheet, Text, View } from "react-native";

interface PercentProps {
    text?: string;
    percentage?: number;
    duration?: number;
}

export function Percentage({ text = "AAA", percentage = 0 }: PercentProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={global.title}>{text}</Text>
            </View>
            <View style={styles.content}>
                <Text
                    style={[
                        global.title,
                        { width: "auto", textAlign: "right" },
                    ]}
                >
                    %{percentage}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    content: {
        flex: 0.5,
        height: "auto",
        justifyContent: "center",
        flexDirection: "column",
    },
});
