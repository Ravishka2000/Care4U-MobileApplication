import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";

const TaskScreen = ({ route }) => {
    const { bookingId } = route.params;
    const [tasks, setTasks] = useState([]);
    const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [isUpdateTaskModalVisible, setUpdateTaskModalVisible] =
        useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskDetailsModalVisible, setTaskDetailsModalVisible] =
        useState(false);
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [bookingId]);

    const fetchTasks = () => {
        axios
            .get(`https://care4u.onrender.com/api/booking/${bookingId}`)
            .then((response) => {
                setTasks(response.data.tasks);
            })
            .catch((error) => {
                console.error("Failed to fetch tasks:", error);
            });
    };

    const openAddTaskModal = () => {
        setAddTaskModalVisible(true);
    };

    const closeAddTaskModal = () => {
        setAddTaskModalVisible(false);
    };

    const openUpdateTaskModal = (task) => {
        setSelectedTask(task);
        setUpdateTaskModalVisible(true);
    };

    const closeUpdateTaskModal = () => {
        setSelectedTask(null);
        setUpdateTaskModalVisible(false);
    };

    const showTaskDetails = (task) => {
        setSelectedTaskDetails(task);
        setTaskDetailsModalVisible(true);
    };

    const closeTaskDetailsModal = () => {
        setSelectedTaskDetails(null);
        setTaskDetailsModalVisible(false);
    };

    const addTask = () => {
        axios
            .post(`https://care4u.onrender.com/api/tasks/${bookingId}`, newTask)
            .then((response) => {
                setNewTask({ title: "", description: "" });
                setAddTaskModalVisible(false);
                fetchTasks();
            })
            .catch((error) => {
                console.error("Failed to add a task:", error);
            });
    };

    const deleteTask = (taskId) => {
        axios
            .delete(
                `https://care4u.onrender.com/api/tasks/${bookingId}/tasks/${taskId}`
            )
            .then(() => {
                const updatedTasks = tasks.filter(
                    (task) => task._id !== taskId
                );
                setTasks(updatedTasks);
            })
            .catch((error) => {
                console.error("Failed to delete the task:", error);
            });
    };

    const updateTask = () => {
        const updatedData = {
            title: selectedTask.title,
            description: selectedTask.description,
        };

        axios
            .put(
                `https://care4u.onrender.com/api/tasks/${bookingId}/tasks/${selectedTask._id}`,
                updatedData
            )
            .then(() => {
                closeUpdateTaskModal();
                fetchTasks();
            })
            .catch((error) => {
                console.error("Failed to update the task:", error);
            });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={openAddTaskModal}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>

            <FlatList
                data={tasks}
                keyExtractor={(task) => task._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => showTaskDetails(item)}>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskStatus}>
                                {item.status ? "Done" : "Not Done"}
                            </Text>
                            <View style={styles.taskActions}>
                                <TouchableOpacity
                                    onPress={() => openUpdateTaskModal(item)}
                                >
                                    <MaterialIcons
                                        name="edit"
                                        size={20}
                                        color="#40513B"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => deleteTask(item._id)}
                                >
                                    <MaterialIcons
                                        name="delete"
                                        size={20}
                                        color="#88304E"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Modal isVisible={isAddTaskModalVisible} style={styles.modal}>
                <View style={styles.addTaskModal}>
                    <Text style={styles.addTaskTitle}>Add Task</Text>
                    <TextInput
                        placeholder="Task Title"
                        value={newTask.title}
                        onChangeText={(text) =>
                            setNewTask({ ...newTask, title: text })
                        }
                        style={styles.addTaskInput}
                    />
                    <TextInput
                        placeholder="Task Description"
                        value={newTask.description}
                        onChangeText={(text) =>
                            setNewTask({ ...newTask, description: text })
                        }
                        style={styles.addTaskInput}
                    />
                    <TouchableOpacity
                        onPress={addTask}
                        style={styles.addTaskButton}
                    >
                        <Text style={styles.addTaskButtonText}>Add Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={closeAddTaskModal}
                        style={styles.closeAddTaskButton}
                    >
                        <Text style={styles.closeAddTaskButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isUpdateTaskModalVisible} style={styles.modal}>
                <View style={styles.addTaskModal}>
                    <Text style={styles.addTaskTitle}>Update Task</Text>
                    <TextInput
                        placeholder="Task Title"
                        value={selectedTask?.title}
                        onChangeText={(text) =>
                            setSelectedTask({ ...selectedTask, title: text })
                        }
                        style={styles.addTaskInput}
                    />
                    <TextInput
                        placeholder="Task Description"
                        value={selectedTask?.description}
                        onChangeText={(text) =>
                            setSelectedTask({
                                ...selectedTask,
                                description: text,
                            })
                        }
                        style={styles.addTaskInput}
                    />
                    <TouchableOpacity
                        onPress={updateTask}
                        style={styles.addTaskButton}
                    >
                        <Text style={styles.addTaskButtonText}>
                            Update Task
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={closeUpdateTaskModal}
                        style={styles.closeAddTaskButton}
                    >
                        <Text style={styles.closeAddTaskButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isTaskDetailsModalVisible} style={styles.modal}>
                <View style={styles.taskDetailsModal}>
                    <Text style={styles.taskDetailsTitle}>Task Details</Text>
                    {selectedTaskDetails && (
                        <View style={styles.taskDetailsContent}>
                            <View style={styles.taskDetailRow}>
                                <Text style={styles.taskDetailsLabel}>
                                    Title:
                                </Text>
                                <Text style={styles.taskDetailsText}>
                                    {selectedTaskDetails.title}
                                </Text>
                            </View>
                            <View style={styles.taskDetailRow}>
                                <Text style={styles.taskDetailsLabel}>
                                    Description:
                                </Text>
                                <Text style={styles.taskDetailsText}>
                                    {selectedTaskDetails.description}
                                </Text>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity
                        onPress={closeTaskDetailsModal}
                        style={styles.closeTaskDetailsButton}
                    >
                        <Text style={styles.closeTaskDetailsButtonText}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    addButton: {
        backgroundColor: "#00ADB5",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    taskTitle: {
        fontSize: 18,
        flex: 1,
        color: "#333",
    },
    taskStatus: {
        color: "#00ADB5",
        fontWeight: "bold",
        marginRight: 20,
    },
    taskActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    addTaskModal: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    addTaskTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        textTransform: "uppercase",
    },
    addTaskInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addTaskButton: {
        backgroundColor: "#00ADB5",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    addTaskButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    closeAddTaskButton: {
        backgroundColor: "#222831",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    closeAddTaskButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    taskDetailsModal: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    taskDetailsTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        textTransform: "uppercase",
    },
    taskDetailsContent: {
        marginBottom: 15,
    },
    taskDetailsLabel: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    taskDetailsText: {
        fontSize: 18,
        color: "#333",
    },
    closeTaskDetailsButton: {
        backgroundColor: "#222831",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 15,
    },
    closeTaskDetailsButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    taskDetailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
});

export default TaskScreen;
