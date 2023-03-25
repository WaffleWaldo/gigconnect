const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
    },
    accountType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, {timestamps: true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)