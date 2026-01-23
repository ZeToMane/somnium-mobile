import { useRef, useEffect, useState } from "react";
import {
    View,
    Image as RNImage,
    StyleSheet,
    Text,
    Pressable,
} from "react-native";
import { Image } from "expo-image";

import { Content } from "@components/Content";
import { Button } from "@components/Button";

import { useProgression } from "@/context/Progression";

import theme from "@theme";
import global from "@styles/global";

const arrow = ">";

const choices = ["fleur", "araignée", "explosion", "robot"];

const nav = ["", "WordChoice", "RobotChoice"];

export default function See() {
    const { setStep } = useProgression();
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const navIndex = useRef(0);

    useEffect(() => {
        setStep(4);
    }, [setStep]);

    const handleWordSelection = (choice: string) => {
        setSelectedWord(choice);

        switch (choice) {
            case "robot":
            case "explosion":
                navIndex.current = 2;
                break;
            case "araignée":
            case "fleur":
                navIndex.current = 1;
                break;
            default:
                navIndex.current = 0;
                break;
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content title="TU TE SENS SEUL.E ?" />
                <RNImage source={require("@assets/images/project/psy.png")} />
                <Image
                    source={require("@assets/images/project/bars.svg")}
                    style={{ width: "100%", height: 15 }}
                />
                <View style={styles.choiceContent}>
                    {choices.map((choice) => (
                        <View
                            key={choice}
                            style={[
                                styles.choiceWrapper,
                                selectedWord === choice &&
                                    styles.choiceWrapperActive,
                            ]}
                        >
                            <Pressable
                                onPress={() => handleWordSelection(choice)}
                            >
                                <Text
                                    style={[
                                        styles.choice,
                                        selectedWord === choice &&
                                            styles.choiceActive,
                                    ]}
                                >
                                    {`${arrow} ${choice}`}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
            <Button navigateTo={nav[navIndex.current]} />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        gap: theme.spacing.lg,
    },
    choiceContent: {
        width: "100%",
        flexDirection: "column",
        gap: theme.spacing.md,
    },
    choiceWrapper: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: theme.spacing.sm,
    },
    choice: {
        ...global.body,
        fontSize: theme.fontSize.md,
        textTransform: "uppercase",
    },
    choiceActive: {
        color: "#FFF",
    },
    choiceWrapperActive: {
        backgroundColor: theme.colors.focus,
    },
});
