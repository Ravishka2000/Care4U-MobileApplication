import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Switch,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/Care4U.png";

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
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Image source={logo} style={styles.logo} />

                    <Text style={styles.header}>Sign up</Text>
            <Text style={styles.welcome}>Hello, Welcome to Care4U.</Text>

            <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your first name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ENter your last name"
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Username"
                        value={userName}
                        onChangeText={setUserName}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Age"
                        value={age}
                        onChangeText={setAge}
                    />

                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your City"
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
                            <Text style={styles.label}>Speciality</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Select your Speciality"
                                value={speciality}
                                onChangeText={setSpeciality}
                            />

                            <Text style={styles.label}>Services</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Services Offered"
                                value={servicesOffered}
                                onChangeText={setServicesOffered}
                            />

                            <Text style={styles.label}>Hourly Rate</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Hourly Rate"
                                value={hourlyRate}
                                onChangeText={setHourlyRate}
                            />
                        </>
                    )}
                    <Pressable
                        style={styles.registerButton}
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
                                color: "black",
                                fontSize: 14,
                            }}
                        >
                            Already have an account? Sign In
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        marginHorizontal: 40
    },
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    welcome: {
        marginBottom: 40,
    },
    logo: {
        marginStart: "auto",
        marginEnd: "auto",
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    input: {
        width: "100%",
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
        backgroundColor: "#00ADB5",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: "left",
    },
});

export default RegisterScreen;
