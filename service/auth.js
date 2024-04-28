const jwt = require ('jsonwebtoken')

secret = "yimmyyimmyyimmyyimmy"

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret);
}

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    },secret);
}

module.exports = {
    getUser, setUser
}