import theme from "@theme";
import { StyleSheet, View } from "react-native";
import { Percentage } from "./Percentage";

export function Status() {
    return (
        <View style={styles.container}>
            {/* <Test /> */}
            <View style={styles.contentLeft}>
                <Percentage text="SPS" percentage={13} />
                <Percentage text="VOL" percentage={78} />
                <Percentage text="DRM" percentage={66} />
            </View>
            <View style={styles.contentRight}>
                <Percentage text="VTL" percentage={60} />
                <Percentage text="PSY" percentage={37} />
                <Percentage text="CMP" percentage={48} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        flexDirection: "row",
    },
    contentLeft: {
        flex: 0.5,
        height: "auto",
        justifyContent: "center",
        flexDirection: "column",
        paddingRight: 7,
        borderRightWidth: 1,
        borderColor: theme.colors.content,
    },
    contentRight: {
        flex: 0.5,
        height: "auto",
        justifyContent: "center",
        flexDirection: "column",
        paddingLeft: 7,
        borderLeftWidth: 1,
        borderColor: theme.colors.content,
    },
});
