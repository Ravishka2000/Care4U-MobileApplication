import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Login");
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#64CCC5", "#537895"]}
                start={[0.1, 0.1]}
                style={styles.linearGradient}
            >
                <Text style={styles.appName}>CARE4U</Text>
                <Text style={styles.slogan}>Your Trusted CareTaker App</Text>
            </LinearGradient>
        </View>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },
    imgBackground: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    linearGradient: {
        width: "100%",
        height: "100%",
        opacity: 0.95,
        justifyContent: "center",
        alignItems: "center",
    },
    appName: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 10,
        marginBottom: 10,
    },
    slogan: {
        color: "#222831",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});
