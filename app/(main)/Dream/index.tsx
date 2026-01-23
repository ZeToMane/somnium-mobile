import { StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";

import { Content } from "@components/Content";
import { center } from "@shopify/react-native-skia";

export default function Dream() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Content title={"VOTRE TEMPS DE RÊVE EST ÉCOULÉ"} />
            </View>
            <Button text={"SE RÉVEILLER"} navigateTo="QR" />
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
    content: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
