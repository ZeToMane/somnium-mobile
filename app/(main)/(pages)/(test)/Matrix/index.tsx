import React, { useMemo } from "react";
import { Dimensions, View } from "react-native";
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

// --- CONFIGURATION ---
const CELL_SIZE = 22;
const SPRITE_SIZE = 16;
const SPEED = 2.0;

const { width, height } = Dimensions.get("window");

// 1. CREATE A DEFAULT PAINT (Fixes the 'null' assignment error)
const defaultPaint = Skia.Paint();

// --- THE WORKLET ---
const noise = (x: number, y: number, time: number) => {
    "worklet";
    return Math.sin(x * 0.15 + time) * Math.cos(y * 0.1 + time);
};

// --- INNER LOGIC COMPONENT ---
const MatrixLogic = ({
    imgOne,
    imgZero,
    imgDot,
}: {
    imgOne: SkImage;
    imgZero: SkImage;
    imgDot: SkImage;
}) => {
    const clock = useClock();

    const { grid, canvasRect } = useMemo(
        () => ({
            grid: {
                cols: Math.floor(width / CELL_SIZE),
                rows: Math.floor(height / CELL_SIZE),
            },
            canvasRect: rect(0, 0, width, height),
        }),
        []
    );

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

        for (let y = 0; y < grid.rows; y++) {
            for (let x = 0; x < grid.cols; x++) {
                const n = noise(x, y, time);

                const posX = x * CELL_SIZE + (CELL_SIZE - SPRITE_SIZE) / 2;
                const posY = y * CELL_SIZE + (CELL_SIZE - SPRITE_SIZE) / 2;

                const dest = rect(posX, posY, SPRITE_SIZE, SPRITE_SIZE);

                // 3. FIX: Use drawImageRect with EXACTLY 4 arguments
                // No nulls, no extra params.
                if (n > 0.6) {
                    canvas.drawImageRect(imgOne, srcOne, dest, defaultPaint);
                } else if (n > 0.2) {
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
    ]);

    return (
        <Canvas style={{ flex: 1 }}>
            <Picture picture={picture} />
        </Canvas>
    );
};

// --- MAIN COMPONENT ---
export default function Matrix() {
    // Note: Ensure these paths are 100% correct relative to this file
    const one = useImage(
        require("../../../../../assets/images/android-icon-background.png")
    );
    const zero = useImage(
        require("../../../../../assets/images/android-icon-foreground.png")
    );
    const dot = useImage(
        require("../../../../../assets/images/android-icon-monochrome.png")
    );

    if (!one || !zero || !dot) {
        return <View style={{ flex: 1, backgroundColor: "black" }} />;
    }

    return <MatrixLogic imgOne={one} imgZero={zero} imgDot={dot} />;
}
