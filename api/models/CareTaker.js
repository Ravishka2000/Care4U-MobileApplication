import mongoose from "mongoose";

const careTakerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    speciality: {
        type: String,
        enum: [
            "Pet",
            "Baby",
            "Patient",
            "Disability Individual",
        ],
        required: true,
    },
    servicesOffered: [
        {
            type: String,
        },
    ],
    hourlyRate: {
        type: Number,
        required: true,
    },
});

const CareTaker = mongoose.model("CareTaker", careTakerSchema);

export default CareTaker;
