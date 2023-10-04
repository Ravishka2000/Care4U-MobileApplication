import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE = "http://localhost:6060"
const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function storeRefreshToken(token) {
        try {
            await AsyncStorage.setItem('rfkey', token);
            console.log('Refresh token stored successfully');
        } catch (error) {
            console.error('Error storing refresh token:', error);
        }
    }

    async function storeIsLogged(status) {
        try {
            await AsyncStorage.setItem('isLogged', status);
            console.log('isLogged stored successfully');
        } catch (error) {
            console.error('Error storing isLogged:', error);
        }
    }

    const checkLogin = async () => {
        await fetch(API_BASE + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json(); // Parse the response JSON if res.ok
                console.log(data.refreshToken);
                storeRefreshToken(data.refreshToken);
                storeIsLogged(true);
                await setUsername();
                window.location.reload(false);
            } else {
                // Handle the case when the response is not OK, e.g., show an error message.
                console.error("Login failed");
            }
        });
    }
    

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });


    return (
        <SafeAreaView>
            <Text>Loin to your Care4u account</Text>

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />

            <Button
                onPress={checkLogin}
                title="Login"
                color="#841584"
                accessibilityLabel="Login"
            />
        </SafeAreaView>
    )
}



export default LoginScreen

const styles = StyleSheet.create({})