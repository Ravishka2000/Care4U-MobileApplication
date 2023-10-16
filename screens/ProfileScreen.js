import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"; // Import jwt_decode
import { UserType } from '../UserContext';

const API_BASE = "http://192.168.163.121:6060"

const ProfileScreen = ({ navigation }) => {
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUser();
    }, []);

    const logout = () => {
        clearAuthToken();
    };

    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.replace("Login");
    };

    return (
        <View>
            <Text>Welcome {userId}</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
