import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SMTP_SECRET
    }
});