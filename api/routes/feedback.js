import { Router } from "express";
import Feedback from "../models/Feedback.js";

const router = Router();

router.get('/feedbacks', async (req, res) => {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
})

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