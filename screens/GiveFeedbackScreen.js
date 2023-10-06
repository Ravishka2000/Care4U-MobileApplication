import axios from 'axios';
import React, { useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const API_BASE = "http://localhost:6060";

const GiveFeedbackScreen = () => {
    const [comment, setComment] = useState("");

    const addFeedback = async () => {

        const feedback = {
            user: '6519926ac4364b83616131d7',
            caretaker: '651d8f8fa949aa9a60784d55',
            name: 'Fluffy',
            feedback: comment,
            date: new Date()
        };
        const headers = {
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };
        axios.post(API_BASE + '/api/feedbacks/add-feedback', feedback, { headers });

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

            <Text>Give A Feedback</Text>

            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={6}
                onChangeText={setComment}
                value={comment}
                placeholder="Enter Your Feedback"
            />



            <Button
                onPress={addFeedback}
                title="Add Feedback"
                color="#841584"
                accessibilityLabel="Add Feedback"
            />
        </ScrollView>
    )
}

export default GiveFeedbackScreen
