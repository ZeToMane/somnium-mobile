import { useMemo, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import theme from "@theme";

type ColorInfo = {
    color: string;
    temperature: "warm" | "cold";
};

export function ColorGrid() {
    const [containerWidth, setContainerWidth] = useState(0);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const colorMap = useMemo(() => {
        const COLS = 12;
        const ROWS = 14;

        const colors: ColorInfo[] = [
            { color: "#4B74E6", temperature: "cold" }, // medium blue
            { color: "#FF4949", temperature: "warm" }, // red/brick
            { color: "#477672", temperature: "cold" }, // dark green
            { color: "#9863BA", temperature: "cold" }, // purple
            { color: "#FA8BA7", temperature: "warm" }, // pink
            { color: theme.colors.background, temperature: "cold" }, // black
            { color: "#FFFFFF", temperature: "cold" }, // white
        ];

        // Initialize grid with black
        const map: ColorInfo[] = new Array(COLS * ROWS).fill({
            color: theme.colors.background,
            temperature: "cold",
        });

        // Place random rectangles
        const numRects = 25 + Math.floor(Math.random() * 5); //15

        for (let i = 0; i < numRects; i++) {
            // Random rectangle dimensions (1-5 wide, 1-4 tall)
            const width = 1 + Math.floor(Math.random() * 5);
            const height = 1 + Math.floor(Math.random() * 4);

            // Random position
            const startCol = Math.floor(Math.random() * COLS);
            const startRow = Math.floor(Math.random() * ROWS);

            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Fill the rectangle
            for (let r = startRow; r < Math.min(startRow + height, ROWS); r++) {
                for (
                    let c = startCol;
                    c < Math.min(startCol + width, COLS);
                    c++
                ) {
                    const index = r * COLS + c;
                    map[index] = color;
                }
            }
        }

        return map;
    }, []);

    const squareSize = containerWidth / 12;
    const COLS = 12;
    const ROWS = 14;

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
        >
            {containerWidth > 0 &&
                Array.from({ length: COLS * ROWS }).map((_, index) => {
                    return (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.square,
                                {
                                    width: squareSize,
                                    height: squareSize,
                                    backgroundColor:
                                        colorMap[index].color === selectedColor
                                            ? theme.colors.focus
                                            : colorMap[index].color,
                                },
                            ]}
                            onPress={() =>
                                setSelectedColor(colorMap[index].color)
                            }
                        />
                    );
                })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    square: {
        borderWidth: 0,
    },
});
