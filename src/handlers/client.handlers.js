import { Sign_Up_Email_Format } from "../email/signup.js";
import clientModels from "../models/client.models.js";
import { transporter } from "../utils/nodemailer.js";

const registerUser = async (req, res) => {
    try {
        const { cnic, email, name, password } = req.body;
        if (!cnic) return res.status(400).json({ message: "Please Enter Your CNIC Number" });
        if (!name) return res.status(400).json({ message: "Please Enter Your Name Number" });
        if (!email) return res.status(400).json({ message: "Please Enter Your Email" });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        };

        await clientModels.create({ fullname, email, password, role: role || "user" });

        await transporter.sendMail({
            from: 'Umar Farooq 🚀',
            to: `${email}, ${process.env.EMAIL}`,
            subject: "Welcome to Our Micro Finance Application! 🚀",
            html: Sign_Up_Email_Format(fullname),
        })

    } catch (error) {
        console.log(error.message);
    }
}
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // Register a new user
// exports.registerUser = async (req, res) => {
//     try {
//         const { cnic, email, name, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = new User({
//             cnic,
//             email,
//             name,
//             password: hashedPassword,
//             phone,
//             address,
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // Login a user
// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });

//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // Get user profile
// exports.getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password"); // Exclude password
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // Update user profile
// exports.updateUserProfile = async (req, res) => {
//     try {
//         const updates = req.body;

//         // Update user fields
//         const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
//             new: true, // Return updated document
//             runValidators: true, // Validate fields
//         }).select("-password");

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({
//             message: "User profile updated successfully",
//             user: updatedUser,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };