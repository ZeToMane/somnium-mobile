import React, { useState } from "react";
import { View, LayoutChangeEvent, StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

import theme from "@theme";
import global from "@styles/global";

export function Range() {
    const layoutWidth = useSharedValue(0);
    const markerWidth = useSharedValue(0);
    const translateX = useSharedValue(0);

    const onLayoutParent = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        layoutWidth.value = width;
        translateX.value = width / 2;
    };

    const onLayoutChild = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        markerWidth.value = width;
    };

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            "worklet";
            translateX.value = event.translationX;
        })
        .onEnd(() => {
            // Optionnel : ressort vers la position initiale
            // translateX.value = withSpring(0);
            // translateY.value = withSpring(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <GestureDetector gesture={gesture}>
                <Animated.View
                    style={[
                        {
                            width: 100,
                            height: 100,
                            backgroundColor: "#3498db",
                            borderRadius: 10,
                        },
                        animatedStyle,
                    ]}
                />
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        borderColor: theme.colors.content,
        borderWidth: 1,
    },
    header: {
        height: 18,
        width: "100%",
        backgroundColor: theme.colors.content,
    },
    content: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "trasparent",
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.md,
    },
    sliderWrapper: {
        position: "relative",
        width: "100%",
        height: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: theme.spacing.md,
    },
    bar: {
        width: "100%",
        height: 2,
        backgroundColor: theme.colors.content,
    },
    border: {
        width: 2,
        height: "100%",
        backgroundColor: theme.colors.content,
    },
    textwrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        //...global.body,
        fontSize: theme.fontSize.md,
    },
    marker: {
        //...global.body,
        fontSize: theme.fontSize.md,
        position: "absolute",
        top: "50%",
        left: "0%",
        transform: "translate(0%,-50%)",
        zIndex: 1,
        color: theme.colors.background,
        backgroundColor: theme.colors.focus,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
});
