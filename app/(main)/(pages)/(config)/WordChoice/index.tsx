import { useState, useRef, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "@components/Button";

import theme from "@theme";
import global from "@styles/global";
import { useProgression } from "@/context/Progression";
import { Content } from "@/components/Content";

const wordList = [
    { name: "sommeil", group: 1 },
    { name: "silence", group: 2 },
    { name: "fantôme", group: 1 },
    { name: "lune", group: 2 },
    { name: "système", group: 1 },
    { name: "ombre", group: 2 },
    { name: "roche", group: 1 },
    { name: "pixel", group: 2 },
    { name: "verre", group: 1 },
    { name: "patate", group: 2 },
    { name: "robot", group: 1 },
    { name: "lumière", group: 2 },
    { name: "croissant", group: 2 },
    { name: "code", group: 1 },
    { name: "comic sans", group: 1 },
    { name: "forêt", group: 2 },
];

const nav = ["Orbits", "ThingsChoice"];

export default function WordChoice() {
    const { setStep } = useProgression();
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const navIndex = useRef<number | null>(null);

    useEffect(() => {
        setStep(5);
    }, [setStep]);

    // Generate random offsets for each word pair
    const wordPairs = useMemo(() => {
        const pairs = [];
        for (let i = 0; i < wordList.length; i += 2) {
            const firstOffset = (Math.random() - 0.5) * 60;
            const factor = Math.random() > 0.5 ? 1 : -1;
            const secondOffset =
                firstOffset + factor * (Math.random() * 40 + 20);

            pairs.push({
                first: { word: wordList[i], offset: firstOffset },
                second: wordList[i + 1]
                    ? { word: wordList[i + 1], offset: secondOffset }
                    : null,
            });
        }
        return pairs;
    }, []);

    const handleWordPress = (wordName: string, group: number) => {
        setSelectedWord(wordName);

        if (group === 1) {
            navIndex.current = 0; // Orbit
        } else if (group === 2) {
            navIndex.current = 1; // ThingsChoice
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Content title="CHOISIS" />
                <View style={styles.gridContainer}>
                    {wordPairs.map((pair, pairIndex) => (
                        <View key={pairIndex} style={styles.rowContainer}>
                            <View
                                style={[
                                    styles.wordWrapper,
                                    {
                                        transform: [
                                            { translateX: pair.first.offset },
                                        ],
                                    },
                                ]}
                            >
                                <Pressable
                                    style={[
                                        styles.wordContainer,
                                        selectedWord === pair.first.word.name &&
                                            styles.active,
                                    ]}
                                    onPress={() =>
                                        handleWordPress(
                                            pair.first.word.name,
                                            pair.first.word.group
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.word,
                                            selectedWord ===
                                                pair.first.word.name &&
                                                styles.activeText,
                                        ]}
                                    >
                                        {pair.first.word.name}
                                    </Text>
                                </Pressable>
                            </View>
                            {pair.second && (
                                <View
                                    style={[
                                        styles.wordWrapper,
                                        {
                                            transform: [
                                                {
                                                    translateX:
                                                        pair.second.offset,
                                                },
                                            ],
                                        },
                                    ]}
                                >
                                    <Pressable
                                        style={[
                                            styles.wordContainer,
                                            selectedWord ===
                                                pair.second.word.name &&
                                                styles.active,
                                        ]}
                                        onPress={() =>
                                            handleWordPress(
                                                pair.second!.word.name,
                                                pair.second!.word.group
                                            )
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.word,
                                                selectedWord ===
                                                    pair.second.word.name &&
                                                    styles.activeText,
                                            ]}
                                        >
                                            {pair.second.word.name}
                                        </Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
            <Button
                navigateTo={
                    navIndex.current !== null ? nav[navIndex.current] : ""
                }
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
    gridContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.sm,
    },
    rowContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    wordWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    wordContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.content,
    },
    word: {
        ...global.body,
        fontSize: theme.fontSize.md,
        textTransform: "uppercase",
    },
    active: {
        backgroundColor: theme.colors.focus,
        borderColor: "#fff",
    },
    activeText: {
        color: "#fff",
    },
});
