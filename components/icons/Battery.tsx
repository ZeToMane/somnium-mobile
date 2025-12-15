import theme from "@theme";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
    color?: string;
}

export default function Battery({
    color = `${theme.colors.content}`,
    ...props
}: IconProps) {
    return (
        <Svg
            height="100%"
            viewBox="0 0 24 12"
            fill="none"
            style={{ aspectRatio: 24 / 12 }}
            {...props}
        >
            <Path
                d="M2 3C1 3 1 9 2 9L19 9C20 9 20 8 20 7L20 5C20 4 20 3 19 3L2 3Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M20 5L22 5L22 7L20 7"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Rect x="3" y="4" width="4" height="4" rx="0.5" fill={color} />
            <Rect x="9" y="4" width="4" height="4" rx="0.5" fill={color} />
            <Rect x="15" y="4" width="4" height="4" rx="0.5" fill={color} />
        </Svg>
    );
}
