import { StyleSheet, View } from "react-native";

import { LottieIntro } from "@/components/Anims/LottieIntro";
import { useRouter, Href } from "expo-router";

const path = "Matrix";

export default function Index() {
    const router = useRouter();

    const handleAnimationFinish = () => {
        router.push(path as Href);
    };

    return (
        <View style={styles.container}>
            <LottieIntro onFinish={handleAnimationFinish} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
