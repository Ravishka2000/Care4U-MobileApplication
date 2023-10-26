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
import ModalDropdown from "react-native-modal-dropdown";
import AppLogo from "../assets/Care4U.png";

const specialities = ["All", "Pet", "Baby", "Patient", "Disability Individual"];

const HomeScreen = () => {
    const [caretakers, setCaretakers] = useState([]);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchCaretakers();
    }, []);

    const fetchCaretakers = () => {
        axios
            .get(
                `https://care4u.onrender.com/api/caretakers?filter=${
                    filter === "All" ? "" : filter
                }`
            )
            .then((response) => {
                setCaretakers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch caretaker data:", error);
            });
    };

    const applyFilter = () => {
        setIsLoading(true);
        fetchCaretakers();
    };

    const handleCaretakerPress = (caretakerId) => {
        navigation.navigate("ViewCaretaker", { caretakerId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={AppLogo} style={styles.appLogo} />
                <Text style={styles.appName}>CARE4U</Text>
            </View>

            <Text style={styles.pageTitle}>Browse Caretakers</Text>

            <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Filter by Speciality:</Text>
                <ModalDropdown
                    options={specialities}
                    defaultValue={specialities[0]}
                    textStyle={styles.filterInput}
                    style={styles.dropdown}
                    dropdownStyle={styles.dropdownMenu}
                    dropdownTextStyle={styles.dropdownText}
                    onSelect={(index, value) => setFilter(value)}
                />
                <Pressable
                    style={styles.applyFilterButton}
                    onPress={applyFilter}
                >
                    <Text style={styles.applyFilterButtonText}>
                        Apply Filter
                    </Text>
                </Pressable>
            </View>

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
                            key={caretaker._id}
                            style={styles.caretakerCard}
                            onPress={() => handleCaretakerPress(caretaker._id)}
                        >
                            <View style={styles.caretakerImageContainer}>
                                <Image
                                    source={{ uri: caretaker.image }}
                                    style={styles.caretakerImage}
                                />
                            </View>
                            <View style={styles.caretakerDetails}>
                                <Text style={styles.caretakerName}>
                                    {caretaker.user.firstName}{" "}
                                    {caretaker.user.lastName}
                                </Text>
                                <Text style={styles.caretakerSpeciality}>
                                    Speciality: {caretaker.speciality}
                                </Text>
                                <View style={styles.caretakerInfo}>
                                    <Text style={styles.caretakerRate}>
                                        Age: {caretaker.user.age} years
                                    </Text>
                                    <Text style={styles.caretakerRate}>
                                        Rate: Rs.{caretaker.hourlyRate}
                                    </Text>
                                </View>
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
        backgroundColor: "#EEEEEE",
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
    caretakerImageContainer: {
        flex: 1,
        justifyContent: "center",
        marginRight: 10,
    },
    caretakerImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    caretakerDetails: {
        flex: 3,
        marginLeft: 10,
        justifyContent: "center",
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
    caretakerInfo: {
        flexDirection: "row",
        marginTop: 10,
    },
    caretakerRate: {
        fontSize: 16,
        color: "#555",
        marginRight: 20,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    filterLabel: {
        marginRight: 10,
    },
    filterInput: {
        flex: 1,
    },
    dropdown: {
        width: 120,
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 5,
        padding: 10,
    },
    dropdownMenu: {
        width: 130,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#555",
    },
    dropdownText: {
        fontSize: 12,
        color: "#555",
    },
    applyFilterButton: {
        backgroundColor: "#00ADB5",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    applyFilterButtonText: {
        color: "white",
        fontSize: 16,
    },
});

export default HomeScreen;
