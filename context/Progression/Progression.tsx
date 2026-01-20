import { createContext, useState, useContext, PropsWithChildren } from "react";

interface ProgressionContextValue {
    step: number;
    progression: number;
    setStep: (value: number) => void;
    incrementProgression: () => void;
}

const ProgressionContext = createContext<ProgressionContextValue | undefined>(
    undefined
);

export function ProgressionProvider({ children }: PropsWithChildren) {
    const [step, setStep] = useState<number>(0);
    const [progression, setprogression] = useState<number>(1);

    const incrementProgression = () => {
        setprogression((prev) => prev + 1);
    };

    return (
        <ProgressionContext.Provider
            value={{ step, progression, setStep, incrementProgression }}
        >
            {children}
        </ProgressionContext.Provider>
    );
}

export const useProgression = () => {
    const context = useContext(ProgressionContext);
    if (!context) {
        throw new Error(
            "useProgression must be used within a ProgressionProvider"
        );
    }
    return context;
};
