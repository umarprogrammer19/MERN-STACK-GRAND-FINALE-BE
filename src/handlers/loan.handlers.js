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