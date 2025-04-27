import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    reviews: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews', 
    }],
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
    }],
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);