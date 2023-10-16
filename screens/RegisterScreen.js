import axios from 'axios';
import React, { useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
    const navigation = useNavigation();



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

            <Button
                onPress={()=> navigation.replace("UserRegistration")}
                title="User Registration"
                color="#841584"
                accessibilityLabel="User Registration"
            />

            <Button
                onPress={()=> navigation.replace("CaretakerRegistration")}
                title="Caretaker Registration"
                color="#841584"
                accessibilityLabel="Caretaker Registration"
            />
        </ScrollView>
    )
}

export default RegisterScreen
