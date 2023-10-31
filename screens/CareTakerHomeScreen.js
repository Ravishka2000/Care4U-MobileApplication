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

    const handleRejectBooking = async (bookingId) => {
        Alert.alert(
            "Confirm Reject",
            "Are you sure you want to reject this booking?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Reject",
                    onPress: async () => {
                        try {
                            await axios.patch(
                                `https://care4u.onrender.com/api/booking/${bookingId}/accept`,
                                { accepted: false }
                            );
                            const updatedBookings = bookings.map((booking) =>
                                booking._id === bookingId
                                    ? { ...booking, status: "Cancelled" }
                                    : booking
                            );
                            setBookings(updatedBookings);
                        } catch (error) {
                            console.error("Failed to reject booking:", error);
                        }
                        fetchBookings();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const totalBookings = bookings.length;
    const pendingBookingsCount = pendingBookings.length;
    const acceptedBookingsCount = acceptedBookings.length;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={AppLogo} style={styles.appLogo} />
                <Text style={styles.appName}>CARE4U</Text>
            </View>

            <Text style={styles.pageTitle}>DASHBOARD</Text>
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{totalBookings}</Text>
                    <Text style={styles.statLabel}>Total Requests</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{pendingBookingsCount}</Text>
                    <Text style={styles.statLabel}>Pending Requests</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        {acceptedBookingsCount}
                    </Text>
                    <Text style={styles.statLabel}>Accepted Requests</Text>
                </View>
            </View>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#2E86DE"
                        style={styles.loadingIndicator}
                    />
                ) : (
                    <ScrollView>
                        {pendingBookings.length === 0 &&
                        acceptedBookings.length === 0 ? (
                            <Text style={styles.noRequestsMessage}>
                                No pending or accepted requests.
                            </Text>
                        ) : (
                            <React.Fragment>
                                {pendingBookings.length > 0 && (
                                    <React.Fragment>
                                        <Text style={styles.bookingHeading}>
                                            Pending Requests
                                        </Text>
                                        {pendingBookings.map((booking) => (
                                            <Pressable
                                                key={booking._id}
                                                style={styles.bookingCard}
                                            >
                                                <Text style={styles.cardTitle}>
                                                    Booking Details
                                                </Text>
                                                <Text style={styles.bookingTitle}>
                                                    {booking.title}
                                                </Text>
                                                <View
                                                    style={
                                                        styles.bookingDetails
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.detailsColumn
                                                        }
                                                    >
                                                        <Text
                                                            style={styles.label}
                                                        >
                                                            Start Date:
                                                        </Text>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {new Date(
                                                                booking.startDate
                                                            ).toDateString()}
                                                        </Text>
                                                        <Text
                                                            style={styles.label}
                                                        >
                                                            End Date:
                                                        </Text>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {new Date(
                                                                booking.endDate
                                                            ).toDateString()}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.detailsColumn
                                                        }
                                                    >
                                                        <Text
                                                            style={styles.label}
                                                        >
                                                            Status:
                                                        </Text>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {booking.status}
                                                        </Text>
                                                        {booking.status ===
                                                            "Pending" && (
                                                            <View
                                                                style={
                                                                    styles.buttonContainer
                                                                }
                                                            >
                                                                <Pressable
                                                                    style={
                                                                        styles.acceptButton
                                                                    }
                                                                    onPress={() =>
                                                                        handleAcceptBooking(
                                                                            booking._id
                                                                        )
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.buttonText
                                                                        }
                                                                    >
                                                                        Accept
                                                                    </Text>
                                                                </Pressable>
                                                                <Pressable
                                                                    style={
                                                                        styles.rejectButton
                                                                    }
                                                                    onPress={() =>
                                                                        handleRejectBooking(
                                                                            booking._id
                                                                        )
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.buttonText
                                                                        }
                                                                    >
                                                                        Reject
                                                                    </Text>
                                                                </Pressable>
                                                            </View>
                                                        )}
                                                    </View>
                                                </View>
                                            </Pressable>
                                        ))}
                                        </React.Fragment>
                                )}
                                {acceptedBookings.length > 0 && (
                                    <React.Fragment>
                                        <Text style={styles.bookingHeading}>
                                            Accepted Requests
                                        </Text>
                                        {acceptedBookings.map((booking) => (
                                            <Pressable
                                                key={booking._id}
                                                style={styles.bookingCard}
                                            >
                                                <Text style={styles.cardTitle}>
                                                    Booking Details
                                                </Text>
                                                <Text style={styles.bookingTitle}>
                                                    {booking.title}
                                                </Text>
                                                <View
                                                    style={
                                                        styles.bookingDetails
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.detailsColumn
                                                        }
                                                    >
                                                        <Text
                                                            style={styles.label}
                                                        >
                                                            Start Date:
                                                        </Text>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {new Date(
                                                                booking.startDate
                                                            ).toDateString()}
                                                        </Text>
                                                        <Text
                                                            style={styles.label}
                                                        >
                                                            End Date:
                                                        </Text>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {new Date(
                                                                booking.endDate
                                                            ).toDateString()}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.detailsColumn
                                                        }
                                                    >
                                                        <Text
                                                            style={styles.label}
                                                        >
                                                            Status:
                                                        </Text>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {booking.status}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        ))}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                    </ScrollView>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};
