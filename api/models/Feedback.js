import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user:{
        type: String,
        required: true,
    },
    caretaker:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    feedback:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    }
});  

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;