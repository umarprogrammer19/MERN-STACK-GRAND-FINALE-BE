import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Sign_Up_Email_Format } from "../email/signup.js";
import { default as usersModels } from "../models/users.models.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";
import { transporter } from "../utils/nodemailer.js";
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

// User Sign Up
export const signUp = async (req, res) => {
    const { fullname, email, password, role } = req.body
    if (!fullname || !email || !password || !req.file) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const existingUser = await usersModels.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const imageURL = await uploadImageToCloudinary(req.file.path)
        if (!imageURL) {
            return res.status(500).json({ message: "Error uploading image" })
        }

        const newUser = await usersModels.create({ fullname, email, password, imageURL, role: role || "user" })

        await transporter.sendMail({
            from: 'Umar Farooq 🚀',
            to: `${email}, ${process.env.EMAIL}`,
            subject: "Welcome to Our Platform! 🚀",
            html: Sign_Up_Email_Format(fullname),
        })

        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error: error.message })
    }
}


// User Login
export const signIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    try {
        const user = await usersModels.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/'
        });
        res.status(200).json({
            message: "User logged in successfully",
            accessToken,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                imageURL: user.imageURL,
            },
        })
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error: error.message })
    }
}

// User SignOut 
export const logOut = async (req, res) => {
    try {
        await res.clearCookie("refreshToken");
        await res.clearCookie("accessToken");
        res.status(200).json({ message: "Logout Successfull" })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "An error occurred during Logout", error: error.message })
    };
};
