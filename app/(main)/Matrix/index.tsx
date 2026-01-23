import { useMemo, useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
    Canvas,
    Picture,
    Skia,
    useClock,
    useImage,
    SkImage,
    rect,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { Href, useRouter } from "expo-router";

import { Header } from "@/components/Header";

import theme from "@theme";

// --- CONFIGURATION ---
const CELL_SIZE = 22; //22
const SPRITE_SIZE = 12; //16
const SPEED = 0.5;

// 1. CREATE A DEFAULT PAINT
const defaultPaint = Skia.Paint();

// Seeded random for column variation
const seededRandom = (seed: number) => {
    "worklet";
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Multi-layered unpredictable noise
const noise = (x: number, y: number, time: number, columnSeed: number) => {
    "worklet";
    // Layer 1: Primary wave with column variation
    const n1 =
        Math.sin(x * 0.15 + time + columnSeed) * Math.cos(y * 0.1 + time);

    // Layer 2: Counter-rotating wave
    const n2 =
        Math.sin(x * 0.08 - time * 0.7 + columnSeed * 2) *
        Math.cos(y * 0.12 - time * 0.5);

    // Layer 3: Diagonal movement
    const n3 = Math.sin(x * 0.2 + y * 0.15 + time * 1.3 + columnSeed * 3);

    // Layer 4: Slow chaos layer
    const n4 = Math.sin((x + y) * 0.05 + time * 0.9 + columnSeed * 4) * 0.3;

    // Layer 5: Fast micro-variations
    const n5 =
        Math.cos(x * 0.3 + y * 0.25 - time * 2.1 + columnSeed * 5) * 0.15;

    // Combine all layers with different weights
    return n1 * 0.35 + n2 * 0.25 + n3 * 0.05 + n4 * 0.15 + n5 * 0.2;
};

// --- INNER LOGIC COMPONENT ---
const MatrixLogic = ({
    imgOne,
    imgZero,
    imgDot,
    width,
    height,
}: {
    imgOne: SkImage;
    imgZero: SkImage;
    imgDot: SkImage;
    width: number;
    height: number;
}) => {
    const clock = useClock();

    const { grid, canvasRect, columnSeeds } = useMemo(() => {
        const cols = Math.floor(width / CELL_SIZE);
        const rows = Math.floor(height / CELL_SIZE);

        // Create unique seed for each column
        const seeds = Array.from({ length: cols }, (_, i) =>
            seededRandom(i * 123.456)
        );

        return {
            grid: { cols, rows },
            canvasRect: rect(0, 0, width, height),
            columnSeeds: seeds,
        };
    }, []);

    // 2. Pre-calculate source rects
    const srcOne = useMemo(
        () => rect(0, 0, imgOne.width(), imgOne.height()),
        [imgOne]
    );
    const srcZero = useMemo(
        () => rect(0, 0, imgZero.width(), imgZero.height()),
        [imgZero]
    );
    const srcDot = useMemo(
        () => rect(0, 0, imgDot.width(), imgDot.height()),
        [imgDot]
    );

    const picture = useDerivedValue(() => {
        const recorder = Skia.PictureRecorder();
        const canvas = recorder.beginRecording(canvasRect);
        const time = clock.value * 0.001 * SPEED;

        for (let x = 0; x < grid.cols; x++) {
            const columnSeed = columnSeeds[x];
            // Each column has slightly different timing
            const columnTime = time + columnSeed * 10;

            for (let y = 0; y < grid.rows; y++) {
                const n = noise(x, y, columnTime, columnSeed);

                const posX = x * CELL_SIZE + (CELL_SIZE - SPRITE_SIZE) / 2;
                const posY = y * CELL_SIZE + (CELL_SIZE - SPRITE_SIZE) / 2;

                const dest = rect(posX, posY, SPRITE_SIZE, SPRITE_SIZE);

                // Adjusted thresholds - more 1s, fewer 0s
                const threshold1 = -0.3 + seededRandom(columnSeed * 1000) * 0.7; // Lower = more 1s
                const threshold2 =
                    -0.1 + seededRandom(columnSeed * 2000) * 0.55; // Lower = fewer 0s

                if (n > threshold1) {
                    canvas.drawImageRect(imgOne, srcOne, dest, defaultPaint);
                } else if (n > threshold2) {
                    canvas.drawImageRect(imgZero, srcZero, dest, defaultPaint);
                } else {
                    canvas.drawImageRect(imgDot, srcDot, dest, defaultPaint);
                }
            }
        }
        return recorder.finishRecordingAsPicture();
    }, [
        clock,
        imgOne,
        imgZero,
        imgDot,
        grid,
        canvasRect,
        srcOne,
        srcZero,
        srcDot,
        columnSeeds,
    ]);

    return (
        <Canvas style={{ flex: 1 }}>
            <Picture picture={picture} />
        </Canvas>
    );
};

// --- MAIN COMPONENT ---
export default function Matrix() {
    const router = useRouter();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const one = useImage(require("@assets/images/shader/one.png"));
    const zero = useImage(require("@assets/images/shader/zero.png"));
    const dot = useImage(require("@assets/images/shader/dot.png"));

    useEffect(() => {
        const page = "QR";
        const timer = setTimeout(() => {
            router.push(page as Href); // or router.replace('/home') to prevent back navigation
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    if (!one || !zero || !dot || dimensions.width === 0) {
        return (
            <View
                style={{ flex: 1, backgroundColor: "black" }}
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setDimensions({ width, height });
                }}
            />
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "black",
                position: "relative",
                gap: theme.spacing.md,
            }}
            onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                if (
                    width !== dimensions.width ||
                    height !== dimensions.height
                ) {
                    setDimensions({ width, height });
                }
            }}
        >
            <Header steps={0} desc={false} />
            <View
                style={{
                    flex: 1,
                    position: "absolute",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Gridlite",
                        fontSize: theme.fontSize.lg,
                        color: "#FFF",
                        backgroundColor: theme.colors.focus,
                        padding: 4,
                    }}
                >
                    LOADING
                </Text>
            </View>
            <MatrixLogic
                imgOne={one}
                imgZero={zero}
                imgDot={dot}
                width={dimensions.width}
                height={dimensions.height}
            />
        </View>
    );
}
