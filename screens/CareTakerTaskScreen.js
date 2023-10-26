import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

const CareTakerTaskScreen = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios
            .get(`https://care4u.onrender.com/api/booking`)
            .then((response) => {
                const acceptedBookings = response.data.filter(
                    (booking) => booking.status === "Confirmed"
                );
                setBookings(acceptedBookings);
            })
            .catch((error) => {
                console.error("Failed to fetch bookings:", error);
            });
    }, []);

    const toggleTaskStatus = (bookingId, taskId) => {
        let status;
        const updatedBookings = bookings.map((booking) => {
            if (booking._id === bookingId) {
                const updatedTasks = booking.tasks.map((task) => {
                    if (task._id === taskId) {
                        status = task.status;
                        return { ...task, status: !task.status };
                    } else {
                        return task;
                    }
                });
                return { ...booking, tasks: updatedTasks };
            } else {
                return booking;
            }
        });

        axios
            .put(
                `https://care4u.onrender.com/api/tasks/${bookingId}/tasks/${taskId}/toggle-status`,
                {
                    status: !status,
                }
            )
            .then(() => {
                setBookings(updatedBookings);
            })
            .catch((error) => {
                console.error("Failed to update the task status:", error);
            });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                keyExtractor={(booking) => booking._id}
                renderItem={({ item }) => (
                    <View style={styles.bookingItem}>
                        <Text style={styles.bookingTitle}>
                            Booking ID: {item._id}
                        </Text>
                        <FlatList
                            data={item.tasks}
                            keyExtractor={(task) => task._id}
                            renderItem={({ item: taskItem }) => (
                                <TouchableOpacity
                                    style={styles.taskItem}
                                    onPress={() =>
                                        toggleTaskStatus(item._id, taskItem._id)
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: "gray",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: 10,
                                                backgroundColor: taskItem.status
                                                    ? "green"
                                                    : "white",
                                            }}
                                        >
                                            {taskItem.status && (
                                                <Text style={{ color: "white" }}>
                                                    ✓
                                                </Text>
                                            )}
                                        </View>
                                        <Text style={styles.taskTitle}>
                                            {taskItem.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    bookingItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    taskTitle: {
        fontSize: 18,
        marginLeft: 10,
    },
});

export default CareTakerTaskScreen;
