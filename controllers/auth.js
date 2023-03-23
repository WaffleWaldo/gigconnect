const User = require("../models/User")
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse, createTokenUser } = require("../utils")

const register = async (req, res) => {
    const { username, email, password, role } = req.body
    
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {

    }

    const user = await User.create({ username, email, password, role})
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

module.exports = { register }