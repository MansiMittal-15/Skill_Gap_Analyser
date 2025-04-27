import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
        default: 5,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

export const Reviews = mongoose.model("Reviews", reviewsSchema);