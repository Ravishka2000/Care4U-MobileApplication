import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserType } from '../UserContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"; // Import jwt_decode
import { Avatar, Card } from 'react-native-paper';

const API_BASE = "http://192.168.163.121:6060";

const LeftContent = props => <Avatar.Icon {...props} icon="account" />;

const GiveFeedbackScreen = () => {

    const [feedbacksData, setFeedbacksData] = useState([])
    const { userId, setUserId } = useContext(UserType);
    const [comment, setComment] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [editingFeedbackId, setEditingFeedbackId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            fetchFeedbacks();
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUser();
    }, []);


    const handleEditFeedback = (feedbackId, currentComment) => {
        setEditMode(true);
        setEditedComment(currentComment);
        setEditingFeedbackId(feedbackId);
    };

    const handleSaveEditedFeedback = async (feedbackId) => {
        if (editingFeedbackId) {
            // Update the feedback on the server
            const updatedFeedback = feedbacksData.find(f => f._id === editingFeedbackId);
            updatedFeedback.feedback = editedComment;

            try {
                const response = await axios.put(API_BASE + '/api/feedbacks/feedback', { id:feedbackId, feedback: editedComment });
                if (response.status === 200) {
                    console.log("Updated Feedback:", response.data);
                    setEditMode(false);
                    fetchFeedbacks();
                } else {
                    console.error("Failed to update feedback.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };

    const handleDelete = async (feedbackId) => {
        try {
          await axios.delete(API_BASE + '/api/feedbacks/feedback', {
            data: {
              id: feedbackId
            }
          });
          // Filter out the deleted feedback from the local state
          setFeedbacksData((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback._id !== feedbackId)
      );
          
        } catch (error) {
          console.error('Failed to delete feedback:', error);
        }
      };
      
      useEffect(() => {
        fetchFeedbacks();
    }, []);

    
    const fetchFeedbacks = async () => {

        try {
            const { data: response } = await axios.get(`${API_BASE}/api/feedbacks/feedbacks`);
            setFeedbacksData(response);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }

    }


    const addFeedback = async () => {

        const feedback = {
            user: userId,
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
        fetchFeedbacks();
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

            <Text>Give A Feedback as {userId}</Text>

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

            {feedbacksData.map((feedback) => (
                <Card key={feedback._id}>
                    <Card.Title title={feedback.name} subtitle={feedback.date} left={LeftContent} />
                    <Card.Content>
                        {editMode && editingFeedbackId === feedback._id ? (
                            <>
                                <TextInput
                                    style={styles.input}
                                    multiline={true}
                                    numberOfLines={6}
                                    onChangeText={setEditedComment}
                                    value={editedComment}
                                />
                                <Button
                                    onPress={()=>handleSaveEditedFeedback(feedback._id)}
                                    title="Save"
                                    color="#841584"
                                />
                            </>
                        ) : (
                            <Text variant="bodyMedium">{feedback.feedback}</Text>
                        )}
                    </Card.Content>
                    <Card.Actions>
                        {userId === feedback.user && !editMode && (
                            <Button
                                onPress={() => handleEditFeedback(feedback._id, feedback.feedback)}
                                title="Edit"
                                color="#841584"
                            />
                        )}
                    </Card.Actions>

                    <Card.Actions>
                        {userId === feedback.user && !editMode && (
                            <Button
                                onPress={() => handleDelete(feedback._id)}
                                title="Delete"
                                color="#841584"
                            />
                        )}
                    </Card.Actions>

                    
                </Card>
            ))}
        </ScrollView>
    )
}

export default GiveFeedbackScreen