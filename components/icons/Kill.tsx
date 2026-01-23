import theme from "@theme";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import { Image } from "expo-image";

interface SvgData {
    viewBox: { w: number; h: number };
    src: string;
}

const svgDefinitions: Record<string, SvgData> = {
    firefly: {
        viewBox: { w: 38, h: 38 },
        src: require("@assets/images/project/kill/firefly.svg"),
    },
    fish: {
        viewBox: { w: 49, h: 49 },
        src: require("@assets/images/project/kill/fish.svg"),
    },
    rat: {
        viewBox: { w: 75, h: 24 },
        src: require("@assets/images/project/kill/rat.svg"),
    },
};

interface IconProps extends ViewProps {
    name: keyof typeof svgDefinitions;
    color?: string;
    size?: number;
}

export default function Kill({
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
