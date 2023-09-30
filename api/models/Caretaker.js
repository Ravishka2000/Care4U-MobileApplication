import mongoose from "mongoose";

const Schema = mongoose.Schema;

const caretakerSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    speciality:{
        type: String,
        enum: [
            "Pet",
            "Baby",
            "Patient",
            "Disability Individual",
        ],
    },
    servicesOffered:{
        type: String,
    },
    hourlyRate:{
        type: Number,
        required: true,
    },

});  

const Caretaker = mongoose.model("Caretaker", caretakerSchema);
export default Caretaker;