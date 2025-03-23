import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
    role: { type: String, enum: ["buyer", "seller"], default: "buyer" }
});

const User = mongoose.model('User', UserSchema);

export default User;