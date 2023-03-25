const CustomError = require("../errors")
const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
    const bookings = await Booking.find({})
    res.status(200).json({ bookings })
}

const createBooking = async (req, res) => {
        const booking = await Booking.create(req.body)
        res.status(201).json({ booking })
}

const getBooking = async (req, res, next) => {
    const { id: bookingID } = req.params
    const booking = await Booking.findOne({ _id: bookingID })
    if(!booking){
        throw new CustomError.NotFoundError(`no user with id: ${req.params.id}`)
    }
    res.status(200).json({ booking })
}

const deleteBooking = async (req, res, next) => {
    const { id: bookingID } = req.params
    const booking = await Booking.findOneAndDelete({ _id: bookingID })
    if (!booking){
        throw new CustomError.NotFoundError(`no user with id: ${req.params.id}`)
    }
    res.status(200).json({ booking })
}

module.exports = {
    getAllBookings,
    createBooking,
    getBooking,
    deleteBooking,
}