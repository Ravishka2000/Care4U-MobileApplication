import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Card } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [caretakers, setCaretakers] = useState([]);

  useEffect(() => {
    // Fetch the list of caretakers from your API
    axios.get('http://localhost:6060/api/users')
      .then((response) => {
        setCaretakers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching caretakers:', error);
      });
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Caretakers</Text>
      <FlatList
        data={caretakers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card>
            <Text>Name: {item.userName}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Specialty: {item.caretaker.speciality}</Text>
          </Card>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({})