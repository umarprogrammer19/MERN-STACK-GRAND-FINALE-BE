import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}SMIT_FINALS`
        );
        console.log(`\n🌟🚀 MongoDB Connected Successfully! 🎉🎊`);
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    };
};

export default connectdb