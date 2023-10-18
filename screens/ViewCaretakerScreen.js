import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    Alert,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewCaretakerScreen = ({ route }) => {
    const { caretakerId } = route.params;
    const [caretakerData, setCaretakerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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

    useEffect(() => {
        // Fetch caretaker data using the provided caretakerId
        axios
            .get(`https://care4u.onrender.com/api/caretaker/${caretakerId}`)
            .then((response) => {
                setCaretakerData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch caretaker data:", error);
            });
    }, [caretakerId]);

    const handleBooking = () => {
        setIsModalVisible(true);
    };

    const handleConfirmBooking = () => {
        // Implement the booking logic and send a request to the server
        const bookingData = {
            user: userId, // Get the user ID from your authentication
            caretaker: caretakerId,
            startDate,
            endDate,
        };

        // Send a POST request to create a booking
        axios
            .post("https://care4u.onrender.com/api/booking", bookingData)
            .then((response) => {
                setIsModalVisible(false);
                Alert.alert("Booking Successful", "Your booking has been confirmed!");
            })
            .catch((error) => {
                console.error("Failed to create a booking:", error);
                Alert.alert("Booking Failed", "An error occurred while creating the booking.");
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#2E86DE" style={styles.loadingIndicator} />
            ) : (
                <ScrollView>
                    <Image source={{ uri: caretakerData.image }} style={styles.caretakerImage} />
                    <View style={styles.caretakerDetails}>
                        <Text style={styles.caretakerName}>
                            {caretakerData.user.firstName} {caretakerData.user.lastName}
                        </Text>
                        <Text style={styles.caretakerSpeciality}>Speciality: {caretakerData.speciality}</Text>
                        <Text style={styles.caretakerServices}>Services Offered: {caretakerData.servicesOffered}</Text>
                        <Text style={styles.caretakerRate}>Hourly Rate: ${caretakerData.hourlyRate}</Text>
                        <Text style={styles.caretakerBio}>{caretakerData.bio}</Text>
                        <TouchableOpacity onPress={handleBooking} style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="Start Date"
                        value={startDate}
                        onChangeText={(text) => setStartDate(text)}
                    />
                    <TextInput
                        style={styles.dateInput}
                        placeholder="End Date"
                        value={endDate}
                        onChangeText={(text) => setEndDate(text)}
                    />
                    <Button title="Confirm Booking" onPress={handleConfirmBooking} />
                </View>
            </Modal>
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
    caretakerImage: {
        width: "100%",
        height: 400,
    },
    caretakerDetails: {
        padding: 20,
    },
    caretakerName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    caretakerSpeciality: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    caretakerServices: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    caretakerRate: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    caretakerBio: {
        fontSize: 16,
        color: "#333",
        marginTop: 20,
    },
    bookButton: {
        backgroundColor: "#2E86DE",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    bookButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    dateInput: {
        width: "80%",
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        fontSize: 16,
    },
});

export default ViewCaretakerScreen;
