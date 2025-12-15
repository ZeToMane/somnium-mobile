import theme from "@theme";
import { View } from "react-native";
import Svg, { Rect, SvgProps } from "react-native-svg";

interface StepsProps extends SvgProps {
    steps?: number; // De 0 à 12
    activeColor?: string;
    inactiveColor?: string;
}

// Dimensions constantes pour tous les carrés
const RECT_SIZE = { width: 12.7143, height: 12.8001 };

// Liste des coordonnées des carrés extérieurs (dans l'ordre du SVG fourni)
// L'ordre semble être un tour dans le sens horaire
const OUTER_RECTS = [
    { x: 50.8569, y: 0 }, // 1
    { x: 63.5715, y: 12.8 }, // 2
    { x: 76.2857, y: 25.6001 }, // 3
    { x: 63.5715, y: 38.4001 }, // 4
    { x: 50.8569, y: 51.1997 }, // 5
    { x: 38.1429, y: 51.1999 }, // 6 (Bas)
    { x: 25.4286, y: 51.1999 }, // 7
    { x: 12.7143, y: 38.4001 }, // 8
    { x: 0, y: 25.6001 }, // 9 (Gauche)
    { x: 12.7143, y: 12.8 }, // 10
    { x: 25.4286, y: 0 }, // 11
    { x: 38.1429, y: 0 }, // 12 (Haut)
];

export default function Steps({
    steps = 0, // Combien de carrés extérieurs allumer
    activeColor = theme.colors.focus, // Rose
    inactiveColor = theme.colors.content, // Gris
    ...props
}: StepsProps) {
    return (
        <View style={{ width: "100%", flex: 1, position: "relative" }}>
            <Svg
                viewBox="0 0 89 64"
                fill="none"
                /* style={{ aspectRatio: 89 / 64 }} */
                {...props}
            >
                {/* 1. Le carré du MILIEU (Toujours actif) */}
                <Rect
                    x="38.1429"
                    y="25.6001"
                    width={RECT_SIZE.width}
                    height={RECT_SIZE.height}
                    fill={activeColor}
                />

                {/* 2. Les carrés EXTÉRIEURS (Dynamiques) */}
                {OUTER_RECTS.map((coords, index) => {
                    // Si l'index est inférieur au nombre d'étapes, on allume
                    const isActive = index < steps;

                    return (
                        <Rect
                            key={index}
                            x={coords.x}
                            y={coords.y}
                            width={RECT_SIZE.width}
                            height={RECT_SIZE.height}
                            fill={isActive ? activeColor : inactiveColor}
                        />
                    );
                })}
            </Svg>
        </View>
    );
}
