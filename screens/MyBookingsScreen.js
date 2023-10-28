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
            <View style={styles.header}>
                <Image source={AppLogo} style={styles.appLogo} />
                <Text style={styles.appName}>CARE4U</Text>
            </View>

            <Text style={styles.pageTitle}>My Bookings</Text>
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
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.label}>
                                            Booking Title:
                                        </Text>
                                        <Text style={styles.text}>
                                            {booking.title}
                                        </Text>
                                    </View>
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.label}>
                                            Start Date:
                                        </Text>
                                        <Text style={styles.text}>
                                            {new Date(
                                                booking.startDate
                                            ).toDateString()}
                                        </Text>
                                    </View>
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.label}>
                                            End Date:
                                        </Text>
                                        <Text style={styles.text}>
                                            {new Date(
                                                booking.endDate
                                            ).toDateString()}
                                        </Text>
                                    </View>
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.label}>
                                            Status:
                                        </Text>
                                        <View
                                            style={[
                                                styles.status,
                                                {
                                                    backgroundColor:
                                                        getStatusColor(
                                                            booking.status
                                                        ),
                                                },
                                            ]}
                                        >
                                            <Text style={styles.statusText}>
                                                {booking.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.label}>
                                            Speciality:
                                        </Text>
                                        <Text style={styles.text}>
                                            {booking.caretaker.speciality}
                                        </Text>
                                    </View>
                                    <View style={styles.bookingInfo}>
                                        <Text style={styles.label}>
                                            Hourly Rate:
                                        </Text>
                                        <Text style={styles.text}>
                                            Rs.{booking.caretaker.hourlyRate}
                                        </Text>
                                    </View>
                                </Pressable>
                            )
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
            return "#FFA500"; // Orange
        case "Confirmed":
            return "#008000"; // Green
        case "Cancelled":
            return "#FF0000"; // Red
        default:
            return "#000000"; // Black
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
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
        marginRight: "auto",
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        margin: 10,
        marginTop: 20,
        textTransform: "uppercase",
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
    bookingInfo: {
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#555",
    },
    status: {
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        width: "auto",
    },
    statusText: {
        color: "white",
        fontSize: 16,
    },
});

export default MyBookingsScreen;
