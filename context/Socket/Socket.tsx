import {
    createContext,
    useContext,
    useRef,
    PropsWithChildren,
    type RefObject,
} from "react";
import { Socket } from "socket.io-client";

interface SocketContextValue {
    socket: RefObject<Socket | null>;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export function SocketProvider({ children }: PropsWithChildren) {
    const socket = useRef<Socket | null>(null);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
