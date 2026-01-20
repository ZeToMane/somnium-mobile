import BorderView from "@components/icons/BorderView";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import global from "@styles/global";
import theme from "@theme";

export function QRCode() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);

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

    const renderPicture = (uri: string) => {
        return (
            <View style={styles.containerModal}>
                <Image
                    source={{ uri }}
                    contentFit="contain"
                    style={{ width: 300, aspectRatio: 1 }}
                />
                <Button
                    onPress={() => setUri(null)}
                    title="Take another picture"
                />
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
                    facing={"front"}
                    mode={"picture"}
                />
                <Button onPress={takePicture} title="Take picture" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {uri ? renderPicture(uri) : renderCamera()}
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
        zIndex: 0,
    },
});
