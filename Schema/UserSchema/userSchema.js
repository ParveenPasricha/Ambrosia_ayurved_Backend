const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true, sparse: true, default: null },
    mobile: { type: String, unique: true, required: true },
    otp: { type: String },
    otpExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
