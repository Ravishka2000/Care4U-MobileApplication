import React, { useEffect, useState } from "react";
import {
    Text,
    TextInput,
    Button,
    StyleSheet,
    SafeAreaView,
    Pressable,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                }
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "https://care4u.onrender.com/api/login",
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                if (response.data.isCaretaker){
                    navigation.navigate("CareTakerMain");
                } else {
                    navigation.navigate("Main");
                }
            }
            
        } catch (error) {
            // Handle login error, e.g., show an error message to the user
            console.error("Login failed", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable
                style={{
                    width: "80%",
                    backgroundColor: "#435334",
                    borderRadius: 6,
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingVertical: 10,
                    marginTop: 20,
                }}
                onPress={handleLogin}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    Login
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("Register")}
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: 15,
                    marginTop: 5,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: 14,
                        fontWeight: "bold",
                    }}
                >
                    Don't have an account? Sign Up
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Background color
    },
    header: {
        fontSize: 28, // Larger font size
        marginBottom: 20,
        fontWeight: "bold", // Bold text
        color: "#333", // Text color
    },
    input: {
        width: "80%",
        height: 40,
        borderColor: "#ddd", // Input border color
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5, // Rounded input corners
        backgroundColor: "#fff", // Input background color
        fontSize: 16, // Font size for input
    },
});

export default LoginScreen;
