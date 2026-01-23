import {
    CameraView,
    useCameraPermissions,
    BarcodeScanningResult,
} from "expo-camera";
import io, { Socket } from "socket.io-client";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Href, useRouter } from "expo-router";

import BorderView from "@components/icons/BorderView";

import { useSocket } from "@/context/Socket";

import global from "@styles/global";
import theme from "@theme";

interface QRCodeProps {
    nextPage: string;
}

export function QRCode({ nextPage }: QRCodeProps) {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();

    /* const socket = useRef<Socket | null>(null); */
    const { socket } = useSocket();
    const cameraRef = useRef<CameraView>(null);

    const [isConnected, setIsConnected] = useState(false);

    /**s
     * Camera QR code scanning handler
     */
    const handleScan = (result: BarcodeScanningResult) => {
        try {
            console.log("📷 QR détecté :", result.data);

            // 1️⃣ Parser l’URL du QR code
            const scannedUrl = new URL(result.data);
            const sessionId = scannedUrl.searchParams.get("session");

            if (!sessionId) {
                console.error("❌ Aucun sessionId trouvé dans le QR code");
                return;
            }

            console.log("🔑 Session ID :", sessionId);

            // 2️⃣ Connexion au serveur (PAS à la session)
            socket.current = io(scannedUrl.origin);

            socket.current.on("connect", () => {
                console.log("✅ Mobile connecté au serveur");

                // 3️⃣ Rejoindre la session
                socket.current?.emit("join-session", sessionId);

                // ❌ NE PAS émettre "connexion-done" ici
                // → c’est le serveur qui notifie le web

                router.push(nextPage as Href);
            });

        } catch (err) {
            console.error("❌ QR code invalide :", err);
        }
    };


    const sendMessage = () => {
        console.log("Envoi du message au serveur...");
        /* socket.current?.emit("message-from-mobile", {
            text: "TIQUETONERAT",
        }); */
    };

    /**
     * Handle camera permissions
     */
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={[styles.message, global.body]}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const renderPicture = () => {
        sendMessage();
        return (
            <View style={styles.containerModal}>
                <Text>Connecté</Text>
            </View>
        );
    };

    const renderCamera = () => {
        return (
            <View style={styles.container}>
                <BorderView
                    thickness={2}
                    cornerLength={40}
                    extra={true}
                    color={theme.colors.focus}
                />
                <CameraView
                    style={styles.camera}
                    ref={cameraRef}
                    facing={"back"}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={handleScan}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {isConnected ? renderPicture() : renderCamera()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
    },
    containerModal: {
        position: "absolute",
        top: 0,
        left: 0,
        flex: 1,
        width: "100%",
        backgroundColor: theme.colors.content,
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
});
