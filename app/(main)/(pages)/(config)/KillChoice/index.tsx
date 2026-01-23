import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";

import { Content } from "@components/Content";
import { Button } from "@components/Button";
import Kill from "@components/icons/Kill";

import theme from "@theme";
import { useProgression } from "@/context/Progression";

// Simple seeded random function
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const killList = [
    { name: "firefly", left: "10%" as const, top: "5%" as const },
    { name: "fish", left: "65%" as const, top: "15%" as const },
    { name: "rat", left: "20%" as const, top: "35%" as const },
    { name: "firefly", left: "75%" as const, top: "40%" as const },
    { name: "rat", left: "45%" as const, top: "10%" as const },
    { name: "fish", left: "15%" as const, top: "60%" as const },
    { name: "firefly", left: "50%" as const, top: "75%" as const },
    { name: "rat", left: "70%" as const, top: "65%" as const },
    { name: "fish", left: "30%" as const, top: "80%" as const },
    { name: "firefly", left: "5%" as const, top: "45%" as const },
    { name: "rat", left: "75%" as const, top: "25%" as const },
    { name: "fish", left: "55%" as const, top: "50%" as const },
].map((kill, index) => ({
    ...kill,
    size: 60 + seededRandom(index + 20) * 2,
}));

const nav = ["Alone", "Final"];

export default function KillChoice() {
    const { setStep } = useProgression();
    const [selectedKill, setSelectedKill] = useState<number | null>(null);
    const navIndex = useRef<number | null>(null);
    const sceneToValue = useRef<string | undefined>(undefined);

    useEffect(() => {
        setStep(6);
    }, [setStep]);

    const handleKillSelection = (index: number) => {
        setSelectedKill(index);
        const killName = killList[index].name;

        switch (killName) {
            case "rat":
            case "firefly":
                navIndex.current = 1; // Final
                sceneToValue.current = "TIQUETONERAT";
                break;
            case "fish":
                navIndex.current = 0; // Alone
                sceneToValue.current = undefined;
                break;
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content title="CHOISIS" />
                <View style={styles.killContainer}>
                    {killList.map((kill, index) => {
                        const isSelected = selectedKill === index;
                        const color = isSelected
                            ? theme.colors.focus
                            : theme.colors.content;
                        return (
                            <Pressable
                                key={index}
                                onPress={() => handleKillSelection(index)}
                                style={{
                                    position: "absolute",
                                    left: kill.left,
                                    top: kill.top,
                                }}
                            >
                                {isSelected ? (
                                    <Image
                                        source={require("@assets/images/project/splash.svg")}
                                        style={{
                                            width: kill.size,
                                            height: kill.size,
                                        }}
                                        contentFit="contain"
                                        tintColor={color}
                                    />
                                ) : (
                                    <Kill
                                        name={kill.name}
                                        size={kill.size}
                                        color={color}
                                    />
                                )}
                            </Pressable>
                        );
                    })}
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
        gap: theme.spacing.lg,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        gap: theme.spacing.lg,
    },
    killContainer: {
        flex: 1,
        position: "relative",
        borderWidth: 1,
        borderColor: theme.colors.content,
    },
});
