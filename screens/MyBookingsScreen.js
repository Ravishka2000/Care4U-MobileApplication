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



export default MyBookingsScreen;
