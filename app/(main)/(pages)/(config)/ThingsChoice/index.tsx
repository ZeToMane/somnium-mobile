import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Content } from "@components/Content";
import { Button } from "@components/Button";
import Things from "@components/icons/Things";

import theme from "@theme";
import { useProgression } from "@/context/Progression";

const nav = ["Final"];

// Simple seeded random function
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const thingsList = [
    { name: "bird", left: "10%" as const, top: "5%" as const },
    { name: "butterfly", left: "65%" as const, top: "15%" as const },
    { name: "cow", left: "20%" as const, top: "35%" as const },
    { name: "jellyfish", left: "65%" as const, top: "50%" as const },
    { name: "plant", left: "15%" as const, top: "70%" as const },
    { name: "tree", left: "60%" as const, top: "75%" as const },
].map((thing, index) => ({
    ...thing,
    size: 80 + seededRandom(index + 670) * 60, // Random size between 80-140
}));

export default function ThingsChoice() {
    const { setStep } = useProgression();
    const [selectedThings, setSelectedThings] = useState<number | null>(null);
    const navIndex = useRef<number | null>(null);
    const sceneToValue = useRef<string | undefined>(undefined);

    useEffect(() => {
        setStep(6);
    }, [setStep]);

    const handleSelection = (index: number, name: string) => {
        setSelectedThings(index);

        // Check if index + 1 is even (pair)
        if (name === "butterfly" || "bird") {
            sceneToValue.current = "PARC_OISEAUX_BAKE";
            navIndex.current = 0;
        } else {
            sceneToValue.current = "PARC_BAKED";
            navIndex.current = 0;
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content
                    title="CHOISIS"
                    desc={"QUELLE PHOTO RETIENT TON ATTENTION ?"}
                />
                <View style={styles.thingsContainer}>
                    {thingsList.map((thing, index) => {
                        const isSelected = selectedThings === index;
                        const color = isSelected
                            ? theme.colors.focus
                            : theme.colors.content;
                        return (
                            <Pressable
                                key={index}
                                onPress={() =>
                                    handleSelection(index, thing.name)
                                }
                                style={{
                                    position: "absolute",
                                    left: thing.left,
                                    top: thing.top,
                                }}
                            >
                                <Things
                                    name={thing.name}
                                    size={thing.size}
                                    color={color}
                                />
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
    },
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        gap: theme.spacing.lg,
    },
    thingsContainer: {
        flex: 1,
        position: "relative",
    },
});
