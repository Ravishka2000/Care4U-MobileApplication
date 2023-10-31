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
            <Text style={styles.caretakerRate}>Rate: Rs.{caretakerData.hourlyRate}</Text>
            <Text style={styles.caretakerBio}>{caretakerData.bio}</Text>
            <TouchableOpacity onPress={handleBooking} style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Booking Details</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Title"
              onChangeText={setTitle}
            />
            <Pressable onPress={showStartDatepicker} style={styles.dateInput}>
              <Text>
                {startDate ? startDate.toDateString() : "Select Start Date"}
                {startShow && (
                  <DateTimePicker
                    testID="dateTimePickerStart"
                    value={startDate}
                    mode={startMode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onStartDateChange}
                  />
                )}
              </Text>
            </Pressable>
            <Pressable onPress={showEndDatepicker} style={styles.dateInput}>
              <Text>
                {endDate ? endDate.toDateString() : "Select End Date"}
                {endShow && (
                  <DateTimePicker
                    testID="dateTimePickerEnd"
                    value={endDate}
                    mode={endMode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onEndDateChange}
                  />
                )}
              </Text>
            </Pressable>
            <Pressable onPress={handleConfirmBooking} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </Pressable>
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
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
    padding: 15,
    borderRadius: 10,
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
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputField: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "left",
  },
  dateInput: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#2E86DE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#DD5044",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ViewCaretakerScreen;
