import global from "@styles/global";
import theme from "@theme";
import { Text, View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
    color?: string;
}

export default function Barcode({
    color = `${theme.colors.content}`,
    style,
    ...props
}: IconProps) {
    return (
        <View
            style={[
                {
                    aspectRatio: 353 / 68,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                },
                style,
            ]}
            {...props}
        >
            <Text style={[global.note]}>DREAM N123435678644</Text>
            <Svg viewBox="0 0 353 68" style={{ width: "100%", height: "100%" }}>
                <Path
                    fill={color}
                    d="M0 0h5.74v68H0zm8.61 0h2.87v68H8.61zm5.74 0h8.61v68h-8.61zm11.48 0h2.87v68h-2.87zm8.61 0h5.74v68h-5.74zm8.61 0H57.4v68H43.05zm20.09 0h2.87v68h-2.87zm5.74 0h5.74v68h-5.74zm11.48 0h2.87v68h-2.87zm8.61 0h8.61v68h-8.61zm14.35 0h2.87v68h-2.87zm5.74 0h2.87v68h-2.87zm8.61 0h8.61v68h-8.61zm14.35 0h5.74v68h-5.74zm11.48 0h2.87v68h-2.87zm8.61 0h8.61v68h-8.61zm14.35 0h2.87v68h-2.87zm5.73 0h2.87v68h-2.87zm5.74 0h5.74v68h-5.74zm8.61 0h2.87v68h-2.87zm8.61 0h8.61v68h-8.61zm11.48 0h2.87v68h-2.87zm5.74 0h5.74v68h-5.74zm11.48 0h2.87v68h-2.87zm5.74 0h8.61v68h-8.61zm11.48 0h2.87v68h-2.87zm8.61 0h2.87v68h-2.87zm5.74 0h5.74v68h-5.74zm8.61 0h2.87v68h-2.87zm8.61 0h8.61v68h-8.61zm11.48 0h2.87v68h-2.87zm5.74 0h2.87v68h-2.87zm5.74 0h5.74v68h-5.74zm8.61 0h2.87v68h-2.87zm8.61 0h8.61v68h-8.61zm11.48 0h2.87v68h-2.87zm8.61 0h5.74v68h-5.74zm11.48 0h2.87v68h-2.87zm5.74 0H353v68h-2.87z"
                />
            </Svg>
        </View>
    );
}
