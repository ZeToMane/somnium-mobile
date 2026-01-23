import { createContext, useState, useContext, PropsWithChildren } from "react";

interface SceneContextValue {
    scene: string;
    setScene: (value: string) => void;
}

const SceneContext = createContext<SceneContextValue | undefined>(undefined);

export function SceneProvider({ children }: PropsWithChildren) {
    const [scene, setScene] = useState<string>("");

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
            {children}
        </SceneContext.Provider>
    );
}

export const useScene = () => {
    const context = useContext(SceneContext);
    if (!context) {
        throw new Error("useScene must be used within a ScenePointProvider");
    }
    return context;
};
