import mongoose from "mongoose";

const formSchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    }, 
    subCategory: {
        type: String,
        required: true,
    },
    productUser: {
        type: String,
        enum: ['men', 'women', 'kids', 'unisex'],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    fabric: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    filledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

export const Form = mongoose.model("Form", formSchema);