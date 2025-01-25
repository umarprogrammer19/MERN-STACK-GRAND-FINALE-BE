import { Sign_Up_Email_Format } from "../email/signup.js";
import clientModels from "../models/client.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { transporter } from "../utils/nodemailer.js";
import { generateRandomPassword } from "../utils/random_password.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const { cnic, email, name, role } = req.body;

        // Validate required fields
        if (!cnic) return res.status(400).json({ message: "Please Enter Your CNIC Number" });
        if (!name) return res.status(400).json({ message: "Please Enter Your Name" });
        if (!email) return res.status(400).json({ message: "Please Enter Your Email" });

        // Check if the user already exists by CNIC
        const existingUser = await clientModels.findOne({ cnic });
        if (existingUser) {
            return res.status(400).json({ message: "User with this CNIC already exists" });
        }

        // Generate a random password
        const password = generateRandomPassword(10);

        // Save the user to the database
        await clientModels.create({
            cnic,
            name,
            email,
            password,
            role: role || "user", // Default to "user" if no role is provided
        });

        // Send a welcome email
        await transporter.sendMail({
            from: 'Umar Farooq 🚀',
            to: `${email}, ${process.env.EMAIL}`,
            subject: "Welcome to Our Micro Finance Application! 🚀",
            html: Sign_Up_Email_Format(name, password),
        });

        // Respond to the client
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(400).json({ message: "Error occurred during registration", error: error.message });
    }
};

export const signIn = async (req, res) => {
    const { cnic, password } = req.body;

    if (!cnic || !password) {
        return res.status(400).json({ message: "CNIC and password are required" });
    }

    try {
        // Find user by CNIC
        const user = await clientModels.findOne({ cnic });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(400).json({ message: "Invalid password" });
        // }

        // Generate access and refresh tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        res.status(200).json({
            message: "User logged in successfully",
            accessToken,
            user: {
                id: user._id,
                fullname: user.fullname,
                cnic: user.cnic,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is populated with the authenticated user's data.

        const { password } = req.body;

        // Validate new password
        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }

        // Find the user by ID
        const user = await clientModels.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save(); // Save the updated user object directly

        res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        res.status(500).json({
            message: "An error occurred while resetting the password",
            error: error.message,
        });
    }
};


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