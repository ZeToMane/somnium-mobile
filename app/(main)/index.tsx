import { Camera } from "@/components/Camera";
import { Header } from "@/components/Header";
import { Status } from "@/components/Status";
import { ProgressionCounter } from "@/components/ProgressionCounter";
import Barcode from "@/components/icons/Barcode";
import theme from "@theme";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { QRCode } from "@/components/QRCode";

import { LottieIntro } from "@/components/Anims/LottieIntro";
import { useRouter, Href } from "expo-router";

const path = "Story";

export default function Index() {
    const router = useRouter();
    //router.push(test as Href);

    const handleAnimationFinish = () => {
        router.push(path as Href); // or whatever route you want
    };

    return (
        /* <View
            
        >
            <Header />
            <Status />
            <ProgressionCounter progression={1} />
            <Content
                title={"Lorem Ipsum Morbi non sollicitudin"}
                desc={
                    "Morbi non sollicitudin est, eu commodo diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos"
                }
            />
            <Button />
            <View style={{ width: "100%", flex: 0.7 }}>
                <Camera />
            </View>
            <Barcode style={{ width: "100%" }} />
            <Username />
            <View style={{ width: "100%", flex: 0.7 }}>
                <QRCode nextPage="Intro" />
            </View>

            <Button navigateTo="Story" />
            <Text style={[styles.text, global.title, { flex: 0.3 }]}>
                Edit app/index.tsx to edit this screen.
            </Text>
        </View> */

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
    /* text: {
        width: "100%",
        fontFamily: "Gridlite",
        fontSize: 1 * theme.rem,
    }, */
});
