import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";

import { Content } from "@components/Content";
import { Button } from "@components/Button";
import Robot from "@components/icons/Robot";

import theme from "@theme";
import { useProgression } from "@/context/Progression";

const nav = ["KillChoice", "Final"];

export default function RobotChoice() {
    const { setStep } = useProgression();
    const robotItems = Array.from({ length: 9 }, (_, i) => i);
    const [selectedRobot, setSelectedRobot] = useState<number | null>(null);
    const navIndex = useRef<number | null>(null);
    const sceneToValue = useRef<string | undefined>(undefined);

    useEffect(() => {
        setStep(5);
    }, [setStep]);

    const handleRobotSelection = (index: number) => {
        setSelectedRobot(index);

        // Check if index + 1 is even (pair)
        if ((index + 1) % 2 === 0) {
            navIndex.current = 1; // Final
            sceneToValue.current = "CATA";
        } else {
            navIndex.current = 0; // KillChoice
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content
                    title="ES-TU UN ROBOT ?"
                    desc={"CHOISIS LES ESCALIERS"}
                />
                <View style={styles.gridContainer}>
                    {robotItems.map((item, index) => {
                        const isSelected = selectedRobot === index;
                        const color = isSelected
                            ? theme.colors.focus
                            : theme.colors.content;
                        return (
                            <Pressable
                                key={index}
                                style={styles.robotWrapper}
                                onPress={() => handleRobotSelection(index)}
                            >
                                <Robot
                                    name={`${index}`}
                                    color={color}
                                    style={{ width: "100%" }}
                                />
                            </Pressable>
                        );
                    })}
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingTop: 4,
                            gap: 8,
                        }}
                    >
                        <Image
                            source={require("@assets/images/project/reload.svg")}
                            contentFit="contain"
                            tintColor={theme.colors.content}
                            style={{
                                width: 16,
                                height: 16,
                            }}
                        />
                        <Image
                            source={require("@assets/images/project/headphones.svg")}
                            contentFit="contain"
                            tintColor={theme.colors.content}
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    </View>
                </View>
            </View>
            <Button
                navigateTo={
                    navIndex.current !== null ? nav[navIndex.current] : ""
                }
                {...(sceneToValue.current && { sceneTo: sceneToValue.current })}
            />
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
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    robotWrapper: {
        width: `${100 / 3 - 2}%`,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
