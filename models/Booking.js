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
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lister:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    talent: {
        //need parameter that only places user with talent role in this field
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    eventDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Booking', BookingSchema)