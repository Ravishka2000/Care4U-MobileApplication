import axios from 'axios';
import React, { useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const API_BASE = "http://localhost:6060";

const CaretakerRegisterScreen = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [servicesOffered, setServicesOffered] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [speciality, setSpeciality] = useState("");


    const register = async () => {

        const caretaker = {
            servicesOffered: servicesOffered,
            hourlyRate: hourlyRate,
            speciality: speciality

        }
        const user = {
            userName: userName,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            age: age,
            city: city,
            caretaker: caretaker
        };
    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
    axios.post(API_BASE + '/api/signUp', user, { headers });

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    contentContainer: {
        paddingVertical: 20
    }
});

return (
    <ScrollView contentContainerStyle={styles.contentContainer}>

        <Text>Caretaker Registration</Text>

        <TextInput
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
            placeholder="Enter Your Username"
        />
        <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Your Email"
        />

        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Your Password"
        />

        <TextInput
            style={styles.input}
            onChangeText={setRePassword}
            value={rePassword}
            placeholder="Enter Your Password Again"
        />



        <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Enter Your First Name"
        />

        <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Enter Your Last Name"
        />

        <TextInput
            style={styles.input}
            onChangeText={setAge}
            value={age}
            placeholder="Enter Your Age"
        />

        <TextInput
            style={styles.input}
            onChangeText={setCity}
            value={city}
            placeholder="Enter Your City"
        />

        <TextInput
            style={styles.input}
            onChangeText={setServicesOffered}
            value={servicesOffered}
            placeholder="Enter Your Services Offered"
        />

        <TextInput
            style={styles.input}
            onChangeText={setHourlyRate}
            value={hourlyRate}
            placeholder="Enter Your Hourly Rate"
        />

        <TextInput
            style={styles.input}
            onChangeText={setSpeciality}
            value={speciality}
            placeholder="Enter Your Speciality"
        />

        <Button
            onPress={register}
            title="Register"
            color="#841584"
            accessibilityLabel="Register"
        />
    </ScrollView>
)
}

export default CaretakerRegisterScreen
