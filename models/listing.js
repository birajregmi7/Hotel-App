const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review.js')
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            default: 'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=600',
            set: (v) => (v === '' ? 'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=600' : v)
        }
    },
    price: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});
listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
