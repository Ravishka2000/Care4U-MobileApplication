import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import AppLogo from "../assets/Care4U.png";

const MyBookingsScreen = () => {


    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        // Fetch the bookings for the logged-in user
        axios
            .get(`https://care4u.onrender.com/api/booking`)
            .then((response) => {
                setBookings(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch bookings:", error);
                setIsLoading(false);
            });
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={AppLogo} style={styles.appLogo} />
                <Text style={styles.appName}>CARE4U</Text>
            </View>
        </SafeAreaView>
    );
};



export default MyBookingsScreen;
