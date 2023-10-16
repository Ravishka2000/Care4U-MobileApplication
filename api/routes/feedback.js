import { Router } from "express";
import Feedback from "../models/Feedback.js";

const router = Router();

router.get('/feedbacks', async (req, res) => {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
})

router.put('/feedback', async (req, res) => {
    const feedbackId = req.body.id;
    const updatedFeedback = req.body.feedback;

    if (!feedbackId || !updatedFeedback) {
        return res.status(400).json({ message: 'Missing feedback ID or updated content' });
    }

    try {
        const result = await Feedback.findByIdAndUpdate(feedbackId, { feedback: updatedFeedback });
        if (result) {
            console.log("Updated Feedback: ", result);
            res.status(200).json({ message: 'Feedback updated successfully' });
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update feedback' });
    }
});

router.delete('/feedback', async (req, res) => {
    const feedbackId = req.body.id;

    try {
        // Find the feedback document by its ID and remove it
        const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

        if (deletedFeedback) {
            res.status(200).json({ message: 'Feedback deleted successfully' });
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete feedback' });
    }
});




router.post("/add-feedback", async (req, res) => {

    const user = req.body.user;
    const caretaker = req.body.caretaker;
    const name = req.body.name;
    const feedback = req.body.feedback;
    const date = req.body.date;
   
    const newFeedbackData = {
        user,
        caretaker,
        name,
        feedback,
        date
    }

    const feedbackData = new Feedback(newFeedbackData);

    feedbackData.save()
        .then(() => res.json('Feedback Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;