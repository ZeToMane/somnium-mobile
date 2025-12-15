import theme from "@theme";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
    color?: string;
    strokeWidth?: number;
}

export default function Border({
    color = `${theme.colors.content}`,
    strokeWidth = 1,
    ...props
}: IconProps) {
    return (
        <Svg
            width="100%"
            style={{ flex: 1 }}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M2 7V2h5m10 0h5v5m0 10v5h-5M7 22H2v-5"
                stroke={color}
                strokeWidth={1}
                strokeLinecap="square"
            />
        </Svg>
    );
}
