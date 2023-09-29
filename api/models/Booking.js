import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    caretaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Caretaker",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending",
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
