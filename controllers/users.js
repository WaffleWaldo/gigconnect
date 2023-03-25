const User = require("../models/User")
const CustomError = require("../errors")


const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password')
    res.status(200).json({ users })
}


const getUser = async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID }).select('-password')
    if (!user){
        throw new CustomError.NotFoundError(`no user with id: ${req.params.id}`)
    }
    res.status(200).json({ user })
}

const deleteUser = async (req, res, next) => {
    const { id: userID } = req.params
    const user = await User.findOneAndDelete({ _id: userID })
    if (!user){
        throw new CustomError.NotFoundError(`no user with id: ${req.params.id}`)
    }
    res.status(200).json({ user })
}

const updateUser = (req, res) => {
    res.send("update user info")
}

module.exports = { 
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
 }