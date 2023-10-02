import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";

// Controller for adding a task to a booking
const createTask = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { title, description } = req.body;

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Create the task
        const task = {
            title,
            description,
        };

        // Add the task to the booking's tasks array
        booking.tasks.push(task);

        // Save the updated booking
        await booking.save();

        res.status(201).json({ message: "Task added successfully", task });
    } catch (error) {
        res.status(500).json({
            message: "Error adding task",
            error: error.message,
        });
    }
});

// Controller for viewing tasks for a booking
const viewTasks = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ tasks: booking.tasks });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message,
        });
    }
});

// Controller for updating a task for a booking
const updateTask = asyncHandler(async (req, res) => {
    const { bookingId, taskId } = req.params;
    const { title, description } = req.body;

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Find the task within the booking's tasks array
        const task = booking.tasks.id(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the task properties
        task.title = title;
        task.description = description;

        // Save the updated booking
        await booking.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message,
        });
    }
});

// Controller for deleting a task for a booking
const deleteTask = asyncHandler(async (req, res) => {
    const { bookingId, taskId } = req.params;

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Remove the task from the booking's tasks array
        booking.tasks.id(taskId).remove();

        // Save the updated booking
        await booking.save();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message,
        });
    }
});

// Controller for updating the status of a subtask
const updateSubtaskStatus = asyncHandler(async (req, res) => {
    const { bookingId, taskId, subtaskId } = req.params;
    const { status } = req.body;

    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Find the task within the booking's tasks array
        const task = booking.tasks.id(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Find the subtask within the task's subtasks array
        const subtask = task.subtasks.id(subtaskId);

        if (!subtask) {
            return res.status(404).json({ message: "Subtask not found" });
        }

        // Update the status of the subtask
        subtask.status = status;

        // Save the updated booking
        await booking.save();

        res.status(200).json({
            message: "Subtask status updated successfully",
            subtask,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating subtask status",
            error: error.message,
        });
    }
});

export default {
    createTask,
    viewTasks,
    updateTask,
    deleteTask,
    updateSubtaskStatus,
};
