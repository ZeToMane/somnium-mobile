import { Content } from "@/components/Content";
import { Camera } from "@/components/Camera";
import { Header } from "@/components/Header";
import { Status } from "@/components/Status";
import { StepCounter } from "@/components/StepCounter";
import { Button } from "@components/Button";
import global from "@styles/global";
import theme from "@theme";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Header />
            <Status />
            <StepCounter step={1} />
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
            <Text style={[styles.text, global.title, { flex: 0.3 }]}>
                Edit app/index.tsx to edit this screen.
            </Text>
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
