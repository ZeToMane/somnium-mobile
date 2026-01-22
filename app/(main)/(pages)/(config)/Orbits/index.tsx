import { View, StyleSheet } from "react-native";

import { Content } from "@components/Content";
import Orbit from "@components/icons/Orbit";
import Things from "@components/icons/Things";

import theme from "@theme";

export default function Alone() {
    return (
        <View style={styles.container}>
            <Content title="CHOISIS" />
            {/* <Orbit numOrbits={10} /> */}
            {/* <Image
                source={require("@assets/images/project/things/cow.svg")}
                style={{ width: 200, aspectRatio: 1, backgroundColor: "white" }}
                contentFit="contain"
            /> */}
            <Things name="cow" size={100} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        gap: theme.spacing.lg,
    },
});
