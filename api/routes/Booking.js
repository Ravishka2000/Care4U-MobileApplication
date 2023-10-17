import express from "express";
import BookingController from "../controllers/BookingController.js";

const router =  express.Router();

router.post('/', BookingController.createBooking);


export default router;