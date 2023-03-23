const User = require("../models/User")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")


const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({}).select('-password')
    res.status(200).json({ users })
})


const getUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user){
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }
    res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findOneAndDelete({ _id: userID })
    if (!user){
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }
    res.status(200).json({ user })
})

const updateUser = (req, res) => {
    res.send("update user info")
}

module.exports = { 
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
 }