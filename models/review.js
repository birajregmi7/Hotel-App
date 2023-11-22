const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        max: 5,
        min: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const review = mongoose.model('Review', reviewSchema);
module.exports = review;