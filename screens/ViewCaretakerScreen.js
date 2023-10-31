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
  Pressable,
  TextInput,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const ViewCaretakerScreen = ({ route }) => {
    const { caretakerId } = route.params;
    const [caretakerData, setCaretakerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const { userId, setUserId } = useContext(UserType);
    const [startMode, setStartMode] = useState("date");
    const [endMode, setEndMode] = useState("date");
    const [startShow, setStartShow] = useState(false);
    const [endShow, setEndShow] = useState(false);
  
    const onStartDateChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setStartShow(false);
      setStartDate(currentDate);
    };
  
    const onEndDateChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setEndShow(false);
      setEndDate(currentDate);
    };
  
    const showStartDateMode = (currentMode) => {
      setStartShow(true);
      setStartMode(currentMode);
    };
  
    const showEndDateMode = (currentMode) => {
      setEndShow(true);
      setEndMode(currentMode);
    };
  
    const showStartDatepicker = () => {
      showStartDateMode("date");
    };
  
    const showEndDatepicker = () => {
      showEndDateMode("date");
    };
  
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
  
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    const handleConfirmBooking = () => {
      const bookingData = {
        user: userId,
        caretaker: caretakerId,
        title,
        startDate,
        endDate,
      };
  
      axios
        .post("https://care4u.onrender.com/api/booking", bookingData)
        .then((response) => {
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error("Failed to create a booking:", error);
        });
    };

    const ViewCaretakerScreen = ({ route }) => {
        const { caretakerId } = route.params;
        const [caretakerData, setCaretakerData] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [title, setTitle] = useState("");
        const { userId, setUserId } = useContext(UserType);
        const [startMode, setStartMode] = useState("date");
        const [endMode, setEndMode] = useState("date");
        const [startShow, setStartShow] = useState(false);
        const [endShow, setEndShow] = useState(false);
      
        const onStartDateChange = (event, selectedDate) => {
          const currentDate = selectedDate;
          setStartShow(false);
          setStartDate(currentDate);
        };
      
        const onEndDateChange = (event, selectedDate) => {
          const currentDate = selectedDate;
          setEndShow(false);
          setEndDate(currentDate);
        };
      
        const showStartDateMode = (currentMode) => {
          setStartShow(true);
          setStartMode(currentMode);
        };
      
        const showEndDateMode = (currentMode) => {
          setEndShow(true);
          setEndMode(currentMode);
        };
      
        const showStartDatepicker = () => {
          showStartDateMode("date");
        };
      
        const showEndDatepicker = () => {
          showEndDateMode("date");
        };
      
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
      
        const closeModal = () => {
          setIsModalVisible(false);
        };
      
        const handleConfirmBooking = () => {
          const bookingData = {
            user: userId,
            caretaker: caretakerId,
            title,
            startDate,
            endDate,
          };
      
          axios
            .post("https://care4u.onrender.com/api/booking", bookingData)
            .then((response) => {
              setIsModalVisible(false);
            })
            .catch((error) => {
              console.error("Failed to create a booking:", error);
            });
        };