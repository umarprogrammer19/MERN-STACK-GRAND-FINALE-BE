import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    tokenNumber: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    officeLocation: { type: String, required: true },
    qrCode: { type: String }, // URL for QR Code
}, { timestamps: true });

export default mongoose.model('Token', TokenSchema);