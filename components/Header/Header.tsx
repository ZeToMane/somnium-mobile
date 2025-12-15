import BorderView from "@components/icons/BorderView";
import Steps from "@components/icons/Steps";
import theme from "@theme";
import { StyleSheet, View } from "react-native";
import { BatteryId } from "./BatteryId";
import { Desc } from "./Desc";
import { Title } from "./Title";

export function Header() {
    return (
        <>
            <BatteryId />
            <View style={styles.container}>
                <View style={styles.contentLeft}>
                    <Title />
                    <Desc />
                </View>
                <View style={styles.contentRight}>
                    <BorderView thickness={1} />
                    <Steps steps={1} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    contentLeft: {
        flex: 0.7,
        height: "auto",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    contentRight: {
        flex: 0.3,
        height: 110,
        justifyContent: "center",
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.sm,
    },
});
