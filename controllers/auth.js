const User = require("../models/User")
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require("../utils")

const register = async (req, res) => {
    const { username, email, password, role } = req.body

    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }

    const isFirstAccount = await User.countDocuments({}) === 0
    const accountType = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({
        username, 
        email, 
        password, 
        role,
        accountType
    })

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser})

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

const login = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        throw new CustomError.BadRequestError('Pleaase provide email and passowrd')
    }

    const user =  await User.findOne({ username })

    if (!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser})

    res.status(StatusCodes.CREATED).json({ user: user.email });
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()) 
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = { 
    register,
    login, 
    logout,
}