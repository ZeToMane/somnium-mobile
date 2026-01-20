import { Camera } from "@/components/Camera";
import { Header } from "@/components/Header";
import { Status } from "@/components/Status";
import { Username } from "@/components/Username";
import { ProgressionCounter } from "@/components/ProgressionCounter";
import Barcode from "@/components/icons/Barcode";
import theme from "@theme";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { useScenePoint } from "@/context/ScenePoints";

export default function Index() {
    const { increment } = useScenePoint();
    return (
        <View
            style={{
                flex: 1,
                /* justifyContent: "center",
                alignItems: "center",
                flexDirection: "column", */
            }}
        >
            <Header />
            <Status />
            <ProgressionCounter progression={1} />
            {/* <Content
                title={"Lorem Ipsum Morbi non sollicitudin"}
                desc={
                    "Morbi non sollicitudin est, eu commodo diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos"
                }
            />
            <Button /> */}
            <View style={{ width: "100%", flex: 0.7 }}>
                <Camera />
            </View>
            <Barcode style={{ width: "100%" }} />
            {/* <Username /> */}
            <Button navigateTo="Test" />
            {/* <Text style={[styles.text, global.title, { flex: 0.3 }]}>
                Edit app/index.tsx to edit this screen.
            </Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        width: "100%",
        fontFamily: "Gridlite",
        fontSize: 1 * theme.rem,
    },
});
