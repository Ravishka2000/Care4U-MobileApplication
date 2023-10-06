import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const API_BASE = "http://localhost:6060";

const LeftContent = props => <Avatar.Icon {...props} icon="account" />;

const FeedbackScreen = () => {
    
    const [feedbacksData, setFeedbacksData] = useState([])

    const fetchFeedbackData = async () => {
        
        try {
            const { data: response } = await axios.get(`${API_BASE}/api/feedbacks/feedbacks`);
            setFeedbacksData(response);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
     
    }

    useEffect(() => {
        fetchFeedbackData(); // This will be called only once on initial mount
    }, []); // An empty dependency array ensures it's only executed once

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        contentContainer: {
            paddingVertical: 20,
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {feedbacksData.map((feedback) => (
                <Card key={feedback._id}>
                    <Card.Title title={feedback.name} subtitle={feedback.date} left={LeftContent} />
                    <Card.Content>
                        <Text variant="titleLarge"></Text>
                        <Text variant="bodyMedium">{feedback.feedback}</Text>
                    </Card.Content>
                </Card>
            ))}

            <Button
                // onPress={}
                title="Give A Feedback"
                color="#841584"
                accessibilityLabel="Give A Feedback"
            />
        </ScrollView>
    );
};

export default FeedbackScreen;
