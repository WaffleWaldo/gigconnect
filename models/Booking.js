const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    jobRate: {
        type: String,
        required: true,
        enum: {
            values: ['kids', 'adults', 'mix'],
            message: '{Value} is not supported'
        }
    },
    location: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('Booking', BookingSchema)