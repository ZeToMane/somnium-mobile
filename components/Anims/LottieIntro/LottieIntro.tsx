import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface LottieIntroProps {
    onFinish?: () => void;
}

export function LottieIntro({ onFinish }: LottieIntroProps) {
    const animationRef = useRef<LottieView>(null);

    const handleAnimationFinish = (isCancelled: boolean) => {
        if (!isCancelled && onFinish) {
            onFinish();
        }
    };

    useEffect(() => {
        // Auto-play the animation when component mounts
        animationRef.current?.play(0, 24);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                ref={animationRef}
                source={require("@assets/lottie/loading.json")}
                autoPlay
                loop={false}
                style={styles.animation}
                onAnimationFinish={handleAnimationFinish}
                renderMode="SOFTWARE"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    animation: {
        width: 100,
        height: 100,
    },
});

// Example usage in your screen:
//
// import { useRouter } from 'expo-router';
// import LottieIntro from './LottieIntro';
//
// export default function IntroScreen() {
//   const router = useRouter();
//
//   const handleAnimationFinish = () => {
//     router.replace('/home'); // or whatever route you want
//   };
//
//   return <LottieIntro onAnimationFinish={handleAnimationFinish} />;
// }
