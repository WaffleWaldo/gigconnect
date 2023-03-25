const mongoose = require("mongoose")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password must be at least 8 characters']
    },
    role: {
        type: String,
        enum: ['talent', 'planner'],
        required: [true, 'Please choose a role']
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)