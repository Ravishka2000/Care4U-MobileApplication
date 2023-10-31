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
