import { Camera } from "@/components/Camera";
import { Header } from "@/components/Header";
import { Status } from "@/components/Status";
import { ProgressionCounter } from "@/components/ProgressionCounter";
import Barcode from "@/components/icons/Barcode";
import theme from "@theme";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { QRCode } from "@/components/QRCode";

import { useRouter, Href } from "expo-router";
import { LottieOutro } from "@/components/Anims/LottieOutro";
import { Content } from "@components/Content";

const path = "Dream";

export default function Final() {
    const router = useRouter();

    const handleAnimationFinish = () => {
        router.push(path as Href); // or whatever route you want
    };

    return (
        <View style={styles.container}>
            <Content title={"IL EST TEMPS DE RÊVER"} />
            <LottieOutro onFinish={handleAnimationFinish} />
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
    /* text: {
        width: "100%",
        fontFamily: "Gridlite",
        fontSize: 1 * theme.rem,
    }, */
});
