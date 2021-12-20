const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: "Excerpt is required",
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        trim: true
    },
    ISBN: {
        type: String,
        required: "ISBN is required",
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: "category is required",
        trim: true
    },
    subcategory: {
        type: String,
        required: "Subcategory is required",
        trim: true
    },
    reviews: {
        type: Number,
        default: 0,
        trim: true
        
    },

    deletedAt: Date ,

    isDeleted: {
        type: Boolean,
        default: false
    },

    releasedAt: {
        type: Date,
        required: "Released date is required",
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema)