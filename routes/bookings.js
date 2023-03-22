const express = require('express')
const router = express.Router()

const {
    getAllBookings,
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/bookings")

router.route("/").get(getAllBookings).post(createBooking)
router.route("/:id").get(getBooking).delete(deleteBooking)

module.exports = router