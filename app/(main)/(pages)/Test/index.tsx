import { Text } from "react-native";
import { useScenePoint } from "@/context/ScenePoints";

export default function Test() {
    const { count } = useScenePoint();

    return (
        <Text style={{ color: "white" }}>le caca bien cuit la: {count}</Text>
    );
}
