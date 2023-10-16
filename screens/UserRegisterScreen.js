import axios from 'axios';
import React, { useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_BASE = "http://localhost:6060";

const UserRegisterScreen = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");


    const register = () => {

        const user = {
            userName: userName,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            age: age,
            city: city
        };
    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
    axios.post(API_BASE + '/api/signUp', user, { headers });
    navigation.replace("Profile");

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

        <Text>Register & join with the community</Text>

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

        <Button
            onPress={register}
            title="Register"
            color="#841584"
            accessibilityLabel="Register"
        />
    </ScrollView>
)
}

export default UserRegisterScreen
