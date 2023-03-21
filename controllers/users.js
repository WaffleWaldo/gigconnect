const User = require("../models/User")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")


const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({}).select('-password')
    res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res) => {
        const user = await User.create(req.body)
        res.status(201).json({ user })
})

const getUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user){
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }
    res.status(200).json({ user })
})

const updateUser = (req, res) => {
    res.send("update user info")
}

const deleteUser = (req, res) => {
    res.send("delete user")
}

module.exports = { 
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
 }