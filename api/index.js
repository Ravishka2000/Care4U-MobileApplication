import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import refreshTokenRoutes from "./routes/refreshToken.js"
import userRoutes from "./routes/users.js";
import previousCaretakerRoutes from "./routes/previousCaretaker.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGODB;
const PORT = process.env.PORT || 6000;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api/previous-caretaker", previousCaretakerRoutes);
