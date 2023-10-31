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