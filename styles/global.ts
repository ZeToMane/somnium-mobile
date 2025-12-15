import theme from "@theme";
import { StyleSheet } from "react-native";

const global = StyleSheet.create({
    title: {
        fontFamily: "Gridlite",
        fontSize: theme.fontSize.lg,
        color: theme.colors.content,
    },
    cta: {
        // and header
        fontFamily: "Gridlite",
        fontSize: theme.fontSize.sm,
        color: theme.colors.content,
    },
    body: {
        fontFamily: "Gridlite",
        fontSize: theme.fontSize.sm,
        color: theme.colors.content,
    },
    note: {
        fontFamily: "Gridlite",
        fontSize: theme.fontSize.xs,
        color: theme.colors.content,
    },
});

export default global;
