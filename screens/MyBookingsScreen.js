import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
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

const MyBookingsScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const handleBookingPress = (bookingId) => {
        navigation.navigate("UserTask", { bookingId });
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color="#2E86DE"
                    style={styles.loadingIndicator}
                />
            ) : (
                <ScrollView>
                    {bookings.map(
                        (booking) =>
                            booking.user._id === userId && (
                                <Pressable
                                    key={booking._id}
                                    style={styles.bookingCard}
                                    onPress={() =>
                                        handleBookingPress(booking._id)
                                    }
                                >
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>
                                            Start Date:{" "}
                                        </Text>
                                        {new Date(
                                            booking.startDate
                                        ).toDateString()}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>
                                            End Date:{" "}
                                        </Text>
                                        {new Date(
                                            booking.endDate
                                        ).toDateString()}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>
                                            Status:{" "}
                                        </Text>
                                        {booking.status}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>
                                            Speciality:{" "}
                                        </Text>
                                        {booking.caretaker.speciality}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>
                                            Hourly Rate:{" "}
                                        </Text>
                                        ${booking.caretaker.hourlyRate}
                                    </Text>
                                </Pressable>
                            )
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
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
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
    },
});

export default MyBookingsScreen;
