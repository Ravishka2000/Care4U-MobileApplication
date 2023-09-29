import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    isCaretaker: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
