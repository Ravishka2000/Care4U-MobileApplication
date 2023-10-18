import { StyleSheet } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { UserContext } from "./UserContext";

export default function App() {
    return (
        <>
            <UserContext>
                <StackNavigator />
            </UserContext>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
