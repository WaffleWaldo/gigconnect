const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Booking = require("../models/Booking");

const getAllBookings = asyncWrapper(async (req, res) => {
    const bookings = await Booking.find({})
    res.status(200).json({ bookings })
})

const createBooking = asyncWrapper(async (req, res) => {
        const booking = await Booking.create(req.body)
        res.status(201).json({ booking })
})

const getBooking = asyncWrapper(async (req, res, next) => {
    const { id: bookingID } = req.params
    const booking = await Booking.findOne({ _id: bookingID })
    if(!booking){
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }
    res.status(200).json({ booking })
})

const deleteBooking = asyncWrapper(async (req, res, next) => {
    const { id: bookingID } = req.params
    const booking = await Booking.findOneAndDelete({ _id: bookingID })
    if (!booking){
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }
    res.status(200).json({ booking })
})

module.exports = {
    getAllBookings,
    createBooking,
    getBooking,
    deleteBooking,
}