import { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";

import { Content } from "@components/Content";
import Orbit from "@components/icons/Orbit";
import { Button } from "@components/Button";

import theme from "@theme";

const nav = ["Final"];

export default function Alone() {
    // Create an array of 9 items (3x3 grid as shown in your screenshot)
    const orbitItems = Array.from({ length: 9 }, (_, i) => i);
    const [selectedOrbit, setSelectedOrbit] = useState<number | null>(null);
    const navIndex = useRef<number | null>(null);
    const sceneToValue = useRef<string | undefined>(undefined);

    const handleSelection = (index: number) => {
        setSelectedOrbit(index);

        // Check if index + 1 is even (pair)
        if ((index + 1) % 2 === 0) {
            sceneToValue.current = "NEIGE_BAKED";
            navIndex.current = 0;
        } else {
            sceneToValue.current = "COULOIR_BAKED";
            navIndex.current = 0;
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content title="CHOISIS" />
                <View style={styles.gridContainer}>
                    {orbitItems.map((item, index) => {
                        const isSelected = selectedOrbit === index;
                        const color = isSelected
                            ? theme.colors.focus
                            : theme.colors.content;
                        return (
                            <Pressable
                                key={index}
                                style={styles.orbitWrapper}
                                onPress={() => handleSelection(index)}
                            >
                                <Orbit centerColor={color} orbitColor={color} />
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
        boxSizing: "border-box",
        gap: theme.spacing.lg,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    orbitWrapper: {
        width: `${100 / 3}%`,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
