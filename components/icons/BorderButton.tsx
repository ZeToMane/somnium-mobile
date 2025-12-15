import theme from "@theme";
import { StyleSheet, View } from "react-native";

interface BorderProps {
    color?: string;
    size?: number;
}

export default function BorderButton({
    color = theme.colors.background,
    size = 10,
}: BorderProps) {
    // Shared style for all corners
    const styles = StyleSheet.create({
        cornerStyle: {
            position: "absolute",
            width: size,
            height: size,
            backgroundColor: `${color}`,
        },
        container: {
            ...StyleSheet.absoluteFillObject,
        },
    });

    return (
        <View style={styles.container}>
            {/* Top Left */}
            <View
                style={[
                    styles.cornerStyle,
                    {
                        top: 0,
                        left: 0,
                    },
                ]}
            />

            {/* Top Right */}
            <View
                style={[
                    styles.cornerStyle,
                    {
                        top: 0,
                        right: 0,
                    },
                ]}
            />

            {/* Bottom Left */}
            <View
                style={[
                    styles.cornerStyle,
                    {
                        bottom: 0,
                        left: 0,
                    },
                ]}
            />

            {/* Bottom Right */}
            <View
                style={[
                    styles.cornerStyle,
                    {
                        bottom: 0,
                        right: 0,
                    },
                ]}
            />
        </View>
    );
}
