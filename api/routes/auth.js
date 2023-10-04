import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
//use to hash password
import bcrypt from "bcrypt";
import { signUpBodyValidation, loginBodyValidation } from "../utils/validationSchema.js";
import generateTokens from "../utils/generateTokens.js";
import UserToken from "../models/UserToken.js";
import Caretaker from "../models/Caretaker.js";



const router = Router();

router.post("/signUp", async (req, res) => {
    try {
      
  
      const { email, password, caretaker, ...userData } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: true, message: "User with given email already exists" });
      }
  
      const saltRounds = Number(process.env.SALT);
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        email,
        password: hashPassword,
        ...userData,
      });
  
      // If the "caretaker" field is provided and not empty, create a Caretaker document
      
        if (caretaker  != null) {
            // Assuming you have a valid reference to the Caretaker model
            const newCaretaker = new Caretaker({
              speciality: caretaker.speciality, // Adjust this based on your requirements
              servicesOffered: caretaker.servicesOffered,
              hourlyRate: caretaker.hourlyRate,
            });
      
            await newCaretaker.save();
      
            // Associate the user with the caretaker
            newUser.caretaker = newCaretaker._id;
          }
      
      await newUser.save();
  
      return res.status(201).json({ error: false, message: "Account created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });

router.post("/getUser", async (req, res) => {

        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(401).json({ error: true, message: "user is not there" });
        else if(user){
            res.status(200).json({
                error: false,
                username: user.userName,
                messaage: "User is there",
            });
        } 
})

router.post("/get-user-details", async (req, res) => {

    const user = await User.findOne({ userName: req.body.username });
    if (!user) res.status(401).json({ error: true, message: "user is not there" });
    else if(user){
        res.status(200).json({
            error: false,
            username: user.userName,
            email: user.email,
            messaage: "User is there",
        });
    }
})

router.post("/checkStatus", async (req, res) => {

    const token = await UserToken.findOne({ token: req.body.refreshToken });
    if (!token) res.status(401).json({ error: true, loggedIn: false, message: "user is not logged in" });
    else if(token){
        res.status(200).json({
            error: false,
            loggedIn: true,
            messaage: "User is logged in",
        });
    }
})




// login

router.post("/login", async (req, res) => {
    try {
        //validates the login
        const { error } = loginBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: true, messaage: error.details[0].message });

        //checks user with the given email exist or not
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });


        //compare the password came from request.body with the hash password
        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!verifiedPassword)
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });

        //if the user exists
        const { accessToken, refreshToken } = await generateTokens(user);

        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            messaage: "Logged in succcessfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


export default router;