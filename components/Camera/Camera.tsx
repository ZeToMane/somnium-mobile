import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { Image } from "expo-image";
import io, { Socket, DefaultEventsMap } from "socket.io-client";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import global from "@styles/global";
import theme from "@theme";

export function Camera() {
    const [permission, requestPermission] = useCameraPermissions();

    const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
    const cameraRef = useRef<CameraView>(null);
    
    const [uri, setUri] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    /**s
     * Camera QR code scanning handler
     */
    const handleScan = (result: BarcodeScanningResult) => {
        const sessionId = result.data;
        console.log("QR détecté :", sessionId);

        socket.current = io(sessionId); // IP DU SERVEUR

        socket.current.on("connect", () => {
            console.log("✅ Mobile connecté");
            socket.current?.emit("join-session", sessionId);
            socket.current?.emit("message-from-mobile", {
                text: "TIQUETONERAT"
            });
        });
    };


    const sendMessage = () => {
        console.log("Envoi du message au serveur...");
        socket.current?.emit("message-from-mobile", {
            text: "TIQUETONERAT"
        });
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

    const takePicture = async () => {
        const photo = await cameraRef.current?.takePictureAsync();
        if (photo?.uri) {
            setUri(photo.uri);
        }
    };

    const renderPicture = () => {
        sendMessage()
        return (
            <View style={styles.containerModal}>
                <Text>Connecté</Text>
            </View>
        );
    };

    const renderCamera = () => {
        return (
            <View style={styles.container}>
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
            {/* {uri ? renderPicture(uri) : renderCamera()} */}
            {
                isConnected ? (
                    renderPicture()
                ) : (
                    renderCamera()
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
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
