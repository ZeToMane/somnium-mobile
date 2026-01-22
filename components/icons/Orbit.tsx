import React, { useMemo } from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

interface OrbitalCirclesProps extends SvgProps {
    centerColor?: string;
    orbitColor?: string;
    orbitingDotColor?: string;
    strokeWidth?: number;
    numOrbits?: number; // number of orbit circles
    seed?: number; // for consistent randomization
}

export default function Orbital({
    centerColor = "#8F8D8D",
    orbitColor = "#8F8D8D",
    orbitingDotColor = "#FF578A",
    strokeWidth = 1,
    numOrbits,
    seed,
    ...props
}: OrbitalCirclesProps) {
    const config = useMemo(() => {
        let currentSeed = seed ?? Date.now();
        // Use seed for consistent random generation, or generate new each time
        const rng =
            seed !== undefined
                ? () => {
                      let x = Math.sin(currentSeed++) * 10000;
                      return x - Math.floor(x);
                  }
                : Math.random;

        // Center is always at 55.5, 55.5 in a 111x111 viewBox
        const center = 55.5;
        const dotRadius = 6.5;
        const maxRadius = 55 - dotRadius;
        const centerDotRadius = 1.5;
        const minRadius = 10; // minimum orbit radius

        // Determine number of orbits (2-5 if not specified)
        const orbitsCount = numOrbits ?? Math.floor(rng() * 4) + 2;

        let orbits: number[];

        if (orbitsCount <= 5) {
            // For 5 or fewer orbits: random spacing with variation
            orbits = Array.from({ length: orbitsCount }, (_, i) => {
                const baseRadius =
                    ((i + 1) / orbitsCount) * (maxRadius - minRadius) +
                    minRadius;
                const variation = rng() * 10 - 5; // ±5 variation
                return Math.max(
                    minRadius,
                    Math.min(maxRadius, baseRadius + variation)
                );
            }).sort((a, b) => a - b);
        } else {
            // For more than 5 orbits: evenly distributed with consistent step
            const step = (maxRadius - minRadius) / orbitsCount;
            orbits = Array.from(
                { length: orbitsCount },
                (_, i) => minRadius + step * (i + 1)
            );
        }

        // Place the orbiting dot on the outermost orbit
        const orbitRadius = orbits[orbits.length - 1];
        const angle = rng() * Math.PI * 2; // Random angle
        const dotX = center + orbitRadius * Math.cos(angle);
        const dotY = center + orbitRadius * Math.sin(angle);

        return {
            center,
            centerDotRadius,
            orbits,
            dotX,
            dotY,
            dotRadius,
        };
    }, [seed, numOrbits]);

    return (
        <Svg
            width="100%"
            style={{ flex: 1 }}
            viewBox="0 0 111 111"
            fill="none"
            {...props}
        >
            {/* Center dot */}
            <Circle
                cx={config.center}
                cy={config.center}
                r={config.centerDotRadius}
                fill={centerColor}
            />

            {/* Orbit circles */}
            {config.orbits.map((radius, i) => (
                <Circle
                    key={i}
                    cx={config.center}
                    cy={config.center}
                    r={radius}
                    stroke={orbitColor}
                    strokeWidth={strokeWidth}
                />
            ))}

            {/* Orbiting dot */}
            <Circle
                cx={config.dotX}
                cy={config.dotY}
                r={config.dotRadius}
                fill={orbitingDotColor}
            />
        </Svg>
    );
}
