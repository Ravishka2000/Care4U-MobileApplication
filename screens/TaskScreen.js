import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

const TaskScreen = ({ route }) => {
    const { bookingId } = route.params;
    const [tasks, setTasks] = useState([]);
    const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [isUpdateTaskModalVisible, setUpdateTaskModalVisible] =
        useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        axios
            .get(`https://care4u.onrender.com/api/booking/${bookingId}`)
            .then((response) => {
                setTasks(response.data.tasks);
            })
            .catch((error) => {
                console.error("Failed to fetch tasks:", error);
            });
    }, [bookingId]);

    const openAddTaskModal = () => {
        setAddTaskModalVisible(true);
    };

    const closeAddTaskModal = () => {
        setAddTaskModalVisible(false);
    };

    // Function to open the update task modal
    const openUpdateTaskModal = (task) => {
        setSelectedTask(task);
        setUpdateTaskModalVisible(true);
    };

    // Function to close the update task modal
    const closeUpdateTaskModal = () => {
        setSelectedTask(null);
        setUpdateTaskModalVisible(false);
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
        // Construct the update task data (title and description)
        const updatedData = {
            title: selectedTask.title, // You can update these values as needed
            description: selectedTask.description,
        };

        axios
            .put(
                `https://care4u.onrender.com/api/tasks/${bookingId}/tasks/${selectedTask._id}`,
                updatedData
            )
            .then(() => {
                closeUpdateTaskModal(); // Close the modal after updating
                fetchTasks(); // Refresh the task list
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
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>

            <FlatList
                data={tasks}
                keyExtractor={(task) => task._id}
                renderItem={({ item }) => (
                    <View key={item._id} style={styles.taskItem}>
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
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteTask(item._id)}
                                style={{ marginLeft: 10 }}
                            >
                                <MaterialIcons
                                    name="delete"
                                    size={20}
                                    color="red"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    addButton: {
        backgroundColor: "#2E86DE",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    taskTitle: {
        fontSize: 18,
        flex: 1,
    },
    taskActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    updateTask: {
        color: "green",
        marginLeft: 10,
    },
    deleteTask: {
        color: "red",
        marginLeft: 10,
    },
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    addTaskModal: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    addTaskTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    addTaskInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addTaskButton: {
        backgroundColor: "#2E86DE",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    addTaskButtonText: {
        color: "white",
        fontSize: 16,
    },
    closeAddTaskButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    closeAddTaskButtonText: {
        color: "white",
        fontSize: 16,
    },
    taskStatus: {
        marginRight: 30,
        color: "green"
    }
});

export default TaskScreen;
