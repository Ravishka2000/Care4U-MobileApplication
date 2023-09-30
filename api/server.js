import express from "express";
import {config} from "dotenv";
import authRoutes from "./routes/auth.js";
import dbConnect from "./dbConnect.js";
import refreshTokenRoutes from "./routes/refreshToken.js"
import userRoutes from "./routes/users.js";
import previousCaretakerRoutes from "./routes/previousCaretaker.js";
import cors from "cors";



const app = express();

//allows us access environment variables like dotenv files
config();

dbConnect();


//allows us get json object in request body
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api/previous-caretaker", previousCaretakerRoutes);


const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

