import global from "@styles/global";
import theme from "@theme";
import { StyleSheet, Text, View } from "react-native";

interface ContentProps {
    title?: string;
    desc?: string;
}

export function Content({ title, desc }: ContentProps) {
    return (
        <View style={styles.container}>
            {title && <Text style={[global.title]}>{title}</Text>}
            {desc && <Text style={[global.body]}>{desc}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        justifyContent: "flex-start",
        gap: theme.spacing.sm,
    },
});
