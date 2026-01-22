import React, { useState } from "react";
import { View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

export function Sh() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            "worklet";
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            // Optionnel : ressort vers la position initiale
            // translateX.value = withSpring(0);
            // translateY.value = withSpring(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
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
