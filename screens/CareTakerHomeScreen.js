import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Alert,
    SafeAreaView,
    Image,
} from "react-native";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AppLogo from "../assets/Care4U.png";

const CareTakerHomeScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [acceptedBookings, setAcceptedBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchData();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                `https://care4u.onrender.com/api/booking`
            );
            const allBookings = response.data;
            setBookings(allBookings);
            const pending = allBookings.filter(
                (booking) => booking.status === "Pending"
            );
            const accepted = allBookings.filter(
                (booking) => booking.status === "Confirmed"
            );
            setPendingBookings(pending);
            setAcceptedBookings(accepted);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleAcceptBooking = async (bookingId) => {
        Alert.alert(
            "Confirm",
            "Are you sure you want to Confirm this booking?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: async () => {
                        try {
                            await axios.patch(
                                `https://care4u.onrender.com/api/booking/${bookingId}/accept`,
                                { accepted: true }
                            );
                            const updatedBookings = bookings.map((booking) =>
                                booking._id === bookingId
                                    ? { ...booking, status: "Confirmed" }
                                    : booking
                            );
                            setBookings(updatedBookings);
                            fetchBookings();
                        } catch (error) {
                            console.error("Failed to accept booking:", error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
