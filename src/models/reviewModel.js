const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    bookId: { type: mongoose.Schema.Types.ObjectId, refs: 'Book', required: true },

    reviewedBy: {
        type: String,
        required: true,
        default: "Guest",
        trim:true
    },
    reviewedAt: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        min:1,
        max:5,
        required: true
    },
    deletedAt: Date,   
    isDeleted: {
        type: Boolean,
        default: false
    },
    review: {type:String, trim:true},  
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema)