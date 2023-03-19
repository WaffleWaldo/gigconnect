const User = require("../models/User")

const getAllUsers = (req, res) => {
    res.send("all users")
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getUser = (req, res) => {
    res.send("single user")
}

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