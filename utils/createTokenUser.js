const createTokenUser = (user) => {
    return {username: user.username, userID: user._id, accountType: user.accountType}
}

module.exports = createTokenUser