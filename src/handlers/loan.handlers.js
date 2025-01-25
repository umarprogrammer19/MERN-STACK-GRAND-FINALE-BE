import loanModels from "../models/loan.models";
export const getLoanDetails = async (req, res) => {
    try {
        const loans = await loanModels.find({ userId: req.user.id });

        if (loans.length === 0) {
            return res.status(404).json({
                message: "No loan requests found for this user."
            });
        }

        res.status(200).json({
            message: "Loan requests fetched successfully!",
            loans,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const submitLoanRequest = async (req, res) => {
    try {
        const { category, subcategory, amount, loanPeriod, guarantors } = req.body;

        // Validation
        if (!category || !subcategory || !amount || !loanPeriod || guarantors.length < 2) {
            return res.status(400).json({
                message: "All fields are required, and at least 2 guarantors must be provided."
            });
        }

        // Create a new loan request
        const newLoan = new Loan({
            userId: req.user.id, // Authenticated user's ID
            category,
            subcategory,
            amount,
            loanPeriod,
            guarantors,
            status: "Pending",
            createdAt: new Date(),
        });

        await newLoan.save();

        res.status(201).json({
            message: "Loan request submitted successfully!",
            loan: newLoan,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};