import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\d{5}-\d{7}-\d{1}$/.test(value); // format: *****-*******-*
            },
            message: "Invalid CNIC format. Use #####-#######-# format.",
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    next();
})

export default mongoose.model('users', UserSchema);