import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const [caretakers, setCaretakers] = useState([]);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch caretaker data from the API endpoint
        axios
            .get("https://care4u.onrender.com/api/caretakers")
            .then((response) => {
                setCaretakers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch caretaker data:", error);
            });
    }, []);

    const handleCaretakerPress = (caretakerId) => {
        navigation.navigate("ViewCaretaker", { caretakerId });
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
                    {caretakers.map((caretaker, index) => (
                        <Pressable
                            key={index}
                            style={styles.caretakerCard}
                            onPress={() => handleCaretakerPress(caretaker._id)}
                        >
                            <Image
                                source={{ uri: caretaker.image }}
                                style={styles.caretakerImage}
                            />
                            <View style={styles.caretakerDetails}>
                                <Text style={styles.caretakerName}>
                                    {caretaker.user.firstName}{" "}
                                    {caretaker.user.lastName}
                                </Text>
                                <Text style={styles.caretakerSpeciality}>
                                    Speciality: {caretaker.speciality}
                                </Text>
                                <Text style={styles.caretakerRate}>
                                    Hourly Rate: ${caretaker.hourlyRate}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
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
    caretakerCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    caretakerImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    caretakerDetails: {
        flex: 1,
        marginLeft: 10,
    },
    caretakerName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    caretakerSpeciality: {
        fontSize: 16,
        color: "#555",
        marginTop: 10,
    },
    caretakerServices: {
        fontSize: 16,
        color: "#555",
    },
    caretakerRate: {
        fontSize: 16,
        color: "#555",
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
