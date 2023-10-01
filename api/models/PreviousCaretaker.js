import mongoose from "mongoose";

const Schema = mongoose.Schema;

const previousCaretakerSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
        unique: true,
    },
    date:{
        type: Date,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    paid:{
        type: Number,
        required: true,
    },
});  

const PreviousCaretaker = mongoose.model("PreviousCaretaker", previousCaretakerSchema);
export default PreviousCaretaker;