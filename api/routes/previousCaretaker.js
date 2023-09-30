import { Router } from "express";
import PreviousCaretaker from "../models/PreviousCaretaker.js";

const router = Router();


router.get('/previous-caretaker', async (req, res) => {
    const caretakers = await PreviousCaretaker.find();
    res.json(caretakers);
})

router.post("/add-previous-caretaker", async (req, res) => {

    const name = req.body.name;
    const city = req.body.city;
    const date = req.body.date;
    const duration = req.body.duration;
    const paid = req.body.paid;
   
    const newPreviousCaretakerData = {
        name,
        city,
        date,
        duration,
        paid
    }

    const previousCaretaker = new PreviousCaretaker(newPreviousCaretakerData);

    previousCaretaker.save()
        .then(() => res.json('Previous Caretaker Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;