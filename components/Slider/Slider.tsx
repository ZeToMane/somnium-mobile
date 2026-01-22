import { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    LayoutChangeEvent,
    type StyleProp,
    type ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    clamp,
    useAnimatedReaction,
    type SharedValue,
} from "react-native-reanimated";

import theme from "@theme";

interface SliderProps {
    style?: StyleProp<ViewStyle>;
    progress: SharedValue<number>;
}

export function Slider({ progress, style, ...props }: SliderProps) {
    const layoutWidth = useSharedValue(0);
    const markerWidth = useSharedValue(0);
    const translateX = useSharedValue(0);

    const onLayoutParent = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        layoutWidth.value = width;
    };

    const onLayoutChild = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        markerWidth.value = width;
    };

    useAnimatedReaction(
        () => layoutWidth.value,
        (sum) => {
            if (sum > 0) {
                translateX.value = layoutWidth.value / 2 - markerWidth.value;
            }
        }
    );

    /* useAnimatedReaction(
        () => progress.value,
        (n) => {
            console.warn("progress: ", n);
        }
    ); */

    const gesture = Gesture.Pan()
        .onChange((e) => {
            "worklet";
            if (layoutWidth.value === 0) return;

            translateX.value = clamp(
                translateX.value + e.changeX,
                0,
                layoutWidth.value - markerWidth.value - theme.spacing.sm
            );

            progress.value = Math.round(
                (translateX.value /
                    (layoutWidth.value -
                        markerWidth.value -
                        theme.spacing.sm)) *
                    100
            );
        })
        .onEnd((e) => {
            "worklet";
            translateX.value = withSpring(translateX.value, {
                overshootClamping: true,
            });
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value - markerWidth.value / 2 }],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.content}>
                <View style={styles.sliderWrapper} onLayout={onLayoutParent}>
                    <View style={styles.markerWrapper}>
                        <GestureDetector gesture={gesture}>
                            <Animated.Text
                                style={[styles.marker, animatedStyle]}
                                onLayout={onLayoutChild}
                            >
                                X
                            </Animated.Text>
                        </GestureDetector>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.bar}></View>
                    <View style={styles.border}></View>
                </View>
                <View style={styles.textwrapper}>
                    <Text style={styles.text}>OUI</Text>
                    <Text style={styles.text}>NON</Text>
                </View>
            </View>
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
        // ...global.body,
        fontFamily: "Gridlite",
        color: theme.colors.content,
        fontSize: theme.fontSize.md,
    },
    markerWrapper: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        pointerEvents: "box-none", // so it doesn't block touches
        zIndex: 1,
    },
    marker: {
        fontFamily: "Gridlite",
        transformOrigin: "center",
        fontSize: theme.fontSize.md,
        color: theme.colors.background,
        backgroundColor: theme.colors.focus,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
});
