import Loan from "../models/loan.models.js";
import { transporter } from "../utils/nodemailer.js";
import QRCode from "qrcode";

export const getAllApplications = async (req, res) => {
    try {
        const applications = await Loan.find({}).populate("userId");
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate the status
        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use 'Pending', 'Approved', or 'Rejected'." });
        }

        // Find and update the loan status
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate("userId", "email name");

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan application not found." });
        }

        // If the loan is approved, generate the slip
        if (status === "Approved") {
            const tokenNumber = `TOK-${Date.now()}`;
            const appointmentDate = new Date();
            appointmentDate.setDate(appointmentDate.getDate() + 7); // Set appointment 7 days from now
            const officeLocation = "Saylani Microfinance Office, Karachi";

            // Generate a QR Code
            const qrCodeData = {
                tokenNumber,
                appointmentDate,
                officeLocation,
                loanId: updatedLoan._id,
            };
            const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrCodeData));

            // Email slip to the user
            const email = updatedLoan.userId.email;
            const userName = updatedLoan.userId.name;

            const emailHTML = `
                <h2>Loan Approval Slip</h2>
                <p>Dear ${userName},</p>
                <p>Congratulations! Your loan application has been approved. Please find the details below:</p>
                <ul>
                    <li><strong>Token Number:</strong> ${tokenNumber}</li>
                    <li><strong>Appointment Date:</strong> ${appointmentDate.toDateString()}</li>
                    <li><strong>Office Location:</strong> ${officeLocation}</li>
                </ul>
                <p><strong>QR Code:</strong></p>
                <img src="${qrCodeImage}" alt="QR Code" />
                <p>Please bring this slip to the office on your appointment date.</p>
                <p>Best regards,</p>
                <p>Saylani Microfinance Team</p>
            `;

            await transporter.sendMail({
                from: '"Saylani Microfinance" <no-reply@saylani.org>',
                to: `${email}, ${process.env.EMAIL}`,
                subject: "Loan Approval Slip",
                html: emailHTML,
            });

            res.status(200).json({
                message: "Loan status updated successfully! Slip generated and sent to user.",
                loan: updatedLoan,
                slip: {
                    tokenNumber,
                    appointmentDate,
                    officeLocation,
                    qrCodeImage,
                },
            });
        } else {
            res.status(200).json({
                message: "Loan status updated successfully!",
                loan: updatedLoan,
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// export const assignTokenNumber = async (req, res) => {
//     try {
//         const { tokenNumber } = req.body;

//         if (!tokenNumber) {
//             return res.status(400).json({ message: "Token number is required." });
//         }

//         const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, { tokenNumber }, { new: true });

//         if (!updatedLoan) {
//             return res.status(404).json({ message: "Loan application not found." });
//         }

//         res.status(200).json({ message: "Token number assigned successfully!", loan: updatedLoan });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


export const filterApplications = async (req, res) => {
    try {
        const { city, country } = req.query;

        const filter = {};
        if (city) filter["guarantors.location"] = city;
        if (country) filter["guarantors.location"] = country;

        const applications = await Loan.find(filter).populate("userId", "name email cnic");

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const scheduleAppointment = async (req, res) => {
    try {
        const { appointmentDate } = req.body;

        if (!appointmentDate) {
            return res.status(400).json({ message: "Appointment date is required." });
        }

        const updatedLoan = await Loan.findByIdAndUpdate(
            req.params.id,
            { appointmentDate },
            { new: true }
        );

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan application not found." });
        }

        res.status(200).json({ message: "Appointment scheduled successfully!", loan: updatedLoan });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};