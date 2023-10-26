import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
    SafeAreaView,
} from "react-native";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AppLogo from "../assets/Care4U.png";

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={AppLogo} style={styles.appLogo} />
                <Text style={styles.appName}>CARE4U</Text>
            </View>

            <Text style={styles.pageTitle}>My Profile</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    {isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color="#2E86DE"
                            style={styles.loadingIndicator}
                        />
                    ) : (
                        <View style={styles.profileInfoContainer}>
                            {renderProfileInfo("Username", user.userName)}
                            {renderProfileInfo("Email", user.email)}
                            {renderProfileInfo("First Name", user.firstName)}
                            {renderProfileInfo("Last Name", user.lastName)}
                            {renderProfileInfo("Age", user.age)}
                            {renderProfileInfo("City", user.city)}
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
        </SafeAreaView>
    );
};

const renderProfileInfo = (label, value) => (
    <View style={styles.profileInfo}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: "#393E46",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    appLogo: {
        width: 60,
        height: 40,
    },
    appName: {
        fontSize: 30,
        fontWeight: "800",
        color: "white",
        marginLeft: 85,
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        margin: 10,
        marginTop: 20,
        textTransform: "uppercase",
    },
    profileContainer: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    profileInfoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    profileInfo: {
        width: "48%",
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
        backgroundColor: "#00ADB5",
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
