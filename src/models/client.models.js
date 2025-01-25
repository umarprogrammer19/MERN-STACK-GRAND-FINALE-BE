const UserSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
        unique: true
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