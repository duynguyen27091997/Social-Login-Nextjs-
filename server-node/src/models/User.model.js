import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    avatar:
        {
            data: Buffer,
            contentType: String
        },
    gender: String,
    username: String,
    created_at: Date,
    updated_at: Date
})

const User = mongoose.model('User', UserModel);
export default User;