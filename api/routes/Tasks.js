import express from "express";
import TaskController from "../controllers/TaskController.js";

const router =  express.Router();

router.post('/:bookingId', TaskController.createTask);
router.get('/:bookingId', TaskController.viewTasks);
router.put('/:bookingId/tasks/:taskId', TaskController.updateTask);
router.delete('/:bookingId/tasks/:taskId', TaskController.deleteTask);

router.post('/:bookingId/subtasks/:taskId', TaskController.addSubTask);
router.put('/:bookingId/subtasks/:taskId/:subtaskId', TaskController.updateSubTask);
router.patch('/:bookingId/subtasks/:taskId/:subtaskId', TaskController.updateSubtaskStatus);
router.delete('/:bookingId/subtasks/:taskId/:subtaskId', TaskController.deleteSubTask);


export default router;