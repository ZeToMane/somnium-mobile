import { StyleSheet, Text, View } from "react-native";

import global from "@styles/global";
import theme from "@theme";

interface BorderProps {
    color?: string;
    thickness?: number;
    cornerLength?: number;
    extra?: boolean;
}

export default function Border({
    color = theme.colors.content,
    thickness = 1,
    cornerLength = 20, // How long the corner arms are
    extra = false,
}: BorderProps) {
    // Shared style for all corners
    const styles = StyleSheet.create({
        cornerStyle: {
            position: "absolute",
            width: cornerLength,
            height: cornerLength,
            borderColor: `${color}`,
        },
        middleStyle: {
            position: "absolute",
            width: cornerLength / 2,
            height: cornerLength / 2,
            borderColor: `${color}`,
        },
        container: {
            ...StyleSheet.absoluteFillObject,
            zIndex: 1,
            backgroundColor: "transparent",
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

            {extra && (
                <>
                    <View
                        style={[
                            styles.cornerStyle,
                            {
                                top: 0,
                                left: "50%",
                                borderTopWidth: thickness,
                                transform: "translate(-50%, 0%)",
                            },
                        ]}
                    />

                    <View
                        style={[
                            styles.cornerStyle,
                            {
                                top: "50%",
                                right: 0,
                                borderRightWidth: thickness,
                                transform: "translate(0%, 0%)",
                            },
                        ]}
                    />

                    <View
                        style={[
                            styles.cornerStyle,
                            {
                                top: "50%",
                                left: 0,

                                borderRightWidth: thickness,
                                transform: "translate(-100%, 0%)",
                            },
                        ]}
                    />

                    <View
                        style={[
                            {
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: "translate(-50%, 50%)",
                            },
                        ]}
                    >
                        <Text style={[global.note]}>QR / 43</Text>
                    </View>
                </>
            )}

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
