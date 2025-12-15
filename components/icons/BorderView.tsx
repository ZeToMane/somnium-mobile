import theme from "@theme";
import { StyleSheet, View } from "react-native";

interface BorderProps {
    color?: string;
    thickness?: number;
    cornerLength?: number;
}

export default function Border({
    color = theme.colors.content,
    thickness = 1,
    cornerLength = 20, // How long the corner arms are
}: BorderProps) {
    // Shared style for all corners
    const styles = StyleSheet.create({
        cornerStyle: {
            position: "absolute",
            width: cornerLength,
            height: cornerLength,
            borderColor: `${color}`,
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
                        borderTopWidth: thickness,
                        borderLeftWidth: thickness,
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
                        borderTopWidth: thickness,
                        borderRightWidth: thickness,
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
                        borderBottomWidth: thickness,
                        borderLeftWidth: thickness,
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
                        borderBottomWidth: thickness,
                        borderRightWidth: thickness,
                    },
                ]}
            />
        </View>
    );
}
