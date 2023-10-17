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

        // Use filter to remove the task from the booking's tasks array
        booking.tasks = booking.tasks.filter(task => task._id.toString() !== taskId);

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

const addSubTask = asyncHandler(async (req, res) => {
    const { bookingId, taskId } = req.params;
    const { title, from, to, period, notes } = req.body;

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

        // Create a new subtask
        const newSubtask = {
            title,
            from,
            to,
            period,
            notes,
            status: false,
        };

        // Add the subtask to the task's subtasks array
        task.subtasks.push(newSubtask);

        // Save the updated booking
        await booking.save();

        res.status(201).json({ message: "Subtask added successfully", subtask: newSubtask });
    } catch (error) {
        res.status(500).json({
            message: "Error adding subtask",
            error: error.message,
        });
    }
});

const updateSubTask = asyncHandler(async (req, res) => {
    const { bookingId, taskId, subtaskId } = req.params;
    const { title, from, to, period, notes } = req.body;

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

        // Update the subtask properties
        subtask.title = title;
        subtask.from = from;
        subtask.to = to;
        subtask.period = period;
        subtask.notes = notes;

        // Save the updated booking
        await booking.save();

        res.status(200).json({ message: "Subtask updated successfully", subtask });
    } catch (error) {
        res.status(500).json({
            message: "Error updating subtask",
            error: error.message,
        });
    }
});

const deleteSubTask = asyncHandler(async (req, res) => {
    const { bookingId, taskId, subtaskId } = req.params;

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

        // Use filter to remove the subtask from the task's subtasks array
        task.subtasks = task.subtasks.filter(subtask => subtask._id.toString() !== subtaskId);

        // Save the updated booking
        await booking.save();

        res.status(200).json({ message: "Subtask deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting subtask",
            error: error.message,
        });
    }
});


export default {
    createTask,
    viewTasks,
    updateTask,
    deleteTask,
    addSubTask,
    updateSubTask,
    deleteSubTask,
    updateSubtaskStatus,
};
