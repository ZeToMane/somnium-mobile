import { createContext, useState, useContext, PropsWithChildren } from "react";

interface ScenePointContextValue {
    count: number;
    setCount: (value: number) => void;
    increment: (n: number) => void;
}

const ScenePointContext = createContext<ScenePointContextValue | undefined>(
    undefined
);

export function ScenePointsProvider({ children }: PropsWithChildren) {
    const [count, setCount] = useState<number>(0);

    const increment = (n: number) => setCount((prev) => prev + n);

    return (
        <ScenePointContext.Provider value={{ count, setCount, increment }}>
            {children}
        </ScenePointContext.Provider>
    );
}

export const useScenePoint = () => {
    const context = useContext(ScenePointContext);
    if (!context) {
        throw new Error(
            "useScenePoint must be used within a ScenePointProvider"
        );
    }
    return context;
};
