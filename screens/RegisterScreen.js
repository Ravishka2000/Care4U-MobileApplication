import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Switch,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [isCaretaker, setIsCaretaker] = useState(false);
    const [speciality, setSpeciality] = useState("");
    const [servicesOffered, setServicesOffered] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");

    const navigation = useNavigation();

    const handleRegistration = async () => {
        try {
            const registrationData = {
                userName,
                email,
                password,
                firstName,
                lastName,
                age,
                city,
                isCaretaker,
                speciality: isCaretaker ? speciality : null,
                servicesOffered: isCaretaker ? servicesOffered : null,
                hourlyRate: isCaretaker ? hourlyRate : null,
            };

            // Make an API request to register the user with the registrationData
            const response = await axios.post(
                "https://care4u.onrender.com/api/register",
                registrationData
            );

            if (response.status === 201) {
                // Registration successful, you can navigate to a success screen
                console.log("Registration successful");
                navigation.navigate("Login");
            }
        } catch (error) {
            // Handle registration error, e.g., show an error message to the user
            console.error("Registration failed", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>User Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
            <View style={styles.isCaretakerToggle}>
                <Text>Are you a caretaker?</Text>
                <Switch
                    value={isCaretaker}
                    onValueChange={(value) => setIsCaretaker(value)}
                />
            </View>
            {isCaretaker && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Speciality"
                        value={speciality}
                        onChangeText={setSpeciality}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Services Offered"
                        value={servicesOffered}
                        onChangeText={setServicesOffered}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Hourly Rate"
                        value={hourlyRate}
                        onChangeText={setHourlyRate}
                    />
                </>
            )}
            <Pressable
                style={({ pressed }) => [
                    styles.registerButton,
                    { backgroundColor: pressed ? "#1E6FCE" : "#2E86DE" },
                ]}
                onPress={handleRegistration}
            >
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <Pressable
                    onPress={() => navigation.goBack()}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "gray",
                            fontSize: 14,
                            fontWeight: "bold",
                        }}
                    >
                        Already have an account? Sign In
                    </Text>
                </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
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
    isCaretakerToggle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#2E86DE",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        marginTop: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
});

export default RegisterScreen;
