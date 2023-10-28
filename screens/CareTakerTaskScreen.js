import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import axios from "axios";
import AppLogo from "../assets/Care4U.png";

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
    }, [bookings]);

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={AppLogo} style={styles.appLogo} />
                <Text style={styles.appName}>CARE4U</Text>
            </View>
            <Text style={styles.pageTitle}>Booking Tasks</Text>
            <FlatList
                data={bookings}
                keyExtractor={(booking) => booking._id}
                renderItem={({ item }) => (
                    <View style={styles.bookingItem}>
                        <Text style={styles.bookingTitle}>
                            Booking: {item.title}
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
                                    <View style={styles.taskRow}>
                                        <View
                                            style={[
                                                styles.taskStatus,
                                                {
                                                    backgroundColor:
                                                        taskItem.status
                                                            ? "#4CAF50"
                                                            : "#fff",
                                                    borderColor: taskItem.status
                                                        ? "#4CAF50"
                                                        : "#ccc",
                                                },
                                            ]}
                                        >
                                            {taskItem.status && (
                                                <Text
                                                    style={
                                                        styles.taskStatusText
                                                    }
                                                >
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
                ListHeaderComponent={() => (
                    <View style={styles.headerSpacing} />
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerSpacing} />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        backgroundColor: "#393E46",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    appLogo: {
        width: 60,
        height: 40,
    },
    appName: {
        fontSize: 30,
        fontWeight: "800",
        color: "white",
        marginLeft: 85,
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        margin: 10,
        marginTop: 20,
        textTransform: "uppercase",
    },
    bookingItem: {
        marginBottom: 20,
        padding: 20,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    taskRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    taskStatus: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    taskStatusText: {
        color: "white",
    },
    taskTitle: {
        fontSize: 18,
    },
    headerSpacing: {
        height: 10,
    },
    footerSpacing: {
        height: 10,
    },
});

export default CareTakerTaskScreen;
