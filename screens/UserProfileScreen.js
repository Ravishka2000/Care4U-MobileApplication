import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";

const UserProfileScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);

            try {
                const response = await axios.get(
                    `https://care4u.onrender.com/api/user/${userId}`
                );
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        navigation.navigate("Login");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.title}>My Profile</Text>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#2E86DE"
                        style={styles.loadingIndicator}
                    />
                ) : (
                    <View style={styles.profileInfoContainer}>
                        {renderProfileInfo("Username:", user.userName)}
                        {renderProfileInfo("Email:", user.email)}
                        {renderProfileInfo("First Name:", user.firstName)}
                        {renderProfileInfo("Last Name:", user.lastName)}
                        {renderProfileInfo("Age:", user.age)}
                        {renderProfileInfo("City:", user.city)}
                    </View>
                )}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const renderProfileInfo = (label, value) => (
    <View style={styles.profileInfo}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        padding: 20,
    },
    profileContainer: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "900",
        color: "#333",
        marginBottom: 50,
        textAlign: "center",
    },
    profileInfoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    profileInfo: {
        width: "50%",
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: "#555",
        fontWeight: "bold",
    },
    value: {
        fontSize: 16,
        color: "black",
    },
    logoutButton: {
        backgroundColor: "#2E86DE",
        padding: 15,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20,
    },
    logoutText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 18,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default UserProfileScreen;
