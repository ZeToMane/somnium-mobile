import theme from "@theme";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import { Image } from "expo-image";

interface SvgData {
    viewBox: { w: number; h: number };
    src: string;
}

const svgDefinitions: Record<string, SvgData> = {
    0: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-1.svg"),
    },
    1: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-2.svg"),
    },
    2: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-3.svg"),
    },
    3: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-4.svg"),
    },
    4: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-5.svg"),
    },
    5: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-6.svg"),
    },
    6: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-7.svg"),
    },
    7: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-8.svg"),
    },
    8: {
        viewBox: { w: 113, h: 113 },
        src: require("@assets/images/project/robot/robot-9.svg"),
    },
};

interface IconProps extends ViewProps {
    name: keyof typeof svgDefinitions;
    color?: string;
    size?: number;
}

export default function Robot({
    name,
    color = theme.colors.content,
    size = 24,
    style,
    ...props
}: IconProps) {
    const svgData = svgDefinitions[name];

    if (!svgData) {
        console.warn(`SVG "${name}" not found in definitions`);
        return null;
    }

    return (
        <View
            style={[
                {
                    width: size,
                    aspectRatio: svgData.viewBox.w / svgData.viewBox.h,
                },
                style,
            ]}
        >
            <Image
                source={svgData.src}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
                tintColor={color}
            />
        </View>
    );
}

// Usage example:
// <Icon name="bird" size={48} color="#000" />
// <Icon name="butterfly" size={32} />
// <Icon name="cow" />
