import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";

const CareTakerHomeScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchData();
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

    const handleAcceptBooking = async (bookingId) => {
        try {
            await axios.patch(
                `https://care4u.onrender.com/api/booking/${bookingId}/accept`,
                { accepted: true }
            );
            // You can also update the booking status in the state to reflect the change.
            const updatedBookings = bookings.map((booking) =>
                booking._id === bookingId
                    ? { ...booking, status: "Confirmed" }
                    : booking
            );
            setBookings(updatedBookings);
        } catch (error) {
            console.error("Failed to accept booking:", error);
        }
    };

    const handleRejectBooking = async (bookingId) => {
        try {
            await axios.patch(
                `https://care4u.onrender.com/api/booking/${bookingId}/accept`,
                { accepted: false }
            );
            // You can also update the booking status in the state to reflect the change.
            const updatedBookings = bookings.map((booking) =>
                booking._id === bookingId
                    ? { ...booking, status: "Cancelled" }
                    : booking
            );
            setBookings(updatedBookings);
        } catch (error) {
            console.error("Failed to reject booking:", error);
        }
    };

    // Count the total bookings and pending bookings
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    ).length;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{totalBookings}</Text>
                    <Text style={styles.statLabel}>Total Requests</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{pendingBookings}</Text>
                    <Text style={styles.statLabel}>Pending Requests</Text>
                </View>
            </View>
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color="#2E86DE"
                    style={styles.loadingIndicator}
                />
            ) : (
                <ScrollView>
                    <Text style={styles.bookingHeading}>Booking Requests</Text>
                    {bookings.map(
                        (booking) =>
                            booking.caretaker.user === userId && (
                                <Pressable
                                    key={booking._id}
                                    style={styles.bookingCard}
                                >
                                    <Text style={styles.cardTitle}>Booking Details</Text>
                                    <View style={styles.bookingDetails}>
                                        <View style={styles.detailsColumn}>
                                            <Text style={styles.label}>Start Date:</Text>
                                            <Text style={styles.text}>
                                                {new Date(booking.startDate).toDateString()}
                                            </Text>
                                            <Text style={styles.label}>End Date:</Text>
                                            <Text style={styles.text}>
                                                {new Date(booking.endDate).toDateString()}
                                            </Text>
                                        </View>
                                        <View style={styles.detailsColumn}>
                                            <Text style={styles.label}>Status:</Text>
                                            <Text style={styles.text}>{booking.status}</Text>
                                            {booking.status === "Pending" && (
                                                <View style={styles.buttonContainer}>
                                                    <Pressable
                                                        style={styles.acceptButton}
                                                        onPress={() =>
                                                            handleAcceptBooking(booking._id)
                                                        }
                                                    >
                                                        <Text style={styles.buttonText}>Accept</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        style={styles.rejectButton}
                                                        onPress={() =>
                                                            handleRejectBooking(booking._id)
                                                        }
                                                    >
                                                        <Text style={styles.buttonText}>Reject</Text>
                                                    </Pressable>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </Pressable>
                            )
                    )}
                </ScrollView>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    statsCard: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2E86DE",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    statLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 4,
        opacity: 0.8,
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 1,
        maxWidth: 100,
        alignSelf: "center",
        lineHeight: 16,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bookingCard: {
        backgroundColor: "#fff",
        margin: 10,
        padding: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    bookingHeading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    acceptButton: {
        backgroundColor: "#2E86DE",
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    rejectButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: "white",
    },
    bookingDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailsColumn: {
        flex: 1,
    },
});

export default CareTakerHomeScreen;
