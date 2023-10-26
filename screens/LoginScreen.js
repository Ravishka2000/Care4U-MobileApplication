import React, { useEffect, useState } from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Image,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../assets/Care4U.png";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("CareTakerMain");
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
                if (response.data.isCaretaker) {
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
            <Image source={logo} style={styles.logo} />

            <Text style={styles.header}>Login</Text>
            <Text style={styles.welcome}>Welcome back, Let's login.</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable
                style={{
                    width: "100%",
                    backgroundColor: "#00ADB5",
                    borderRadius: 4,
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingVertical: 10,
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
                        color: "#262626",
                        fontSize: 14,
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
        backgroundColor: "#ffffff",
        marginHorizontal: 40,
    },
    logo: {
        marginStart: 'auto',
        marginEnd: 'auto',
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 40,
    },
    header: {
        fontSize: 28, 
        marginBottom: 10,
        fontWeight: "bold", 
        color: "#333",
        textAlign: "left",
    },
    welcome: {
        marginBottom: 40,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#404040",
        borderWidth: 0.8,
        marginBottom: 30,
        padding: 10,
        borderRadius: 5, 
        backgroundColor: "#ffff", 
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: "left",
    },
});

export default LoginScreen;
