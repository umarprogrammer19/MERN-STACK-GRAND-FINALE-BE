const LoanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    amount: { type: Number, required: true },
    loanPeriod: { type: Number, required: true },
    guarantors: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            location: { type: String, required: true },
            cnic: { type: String, required: true }
        }
    ],
    status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', LoanSchema);
