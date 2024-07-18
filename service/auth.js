const jwt = require ('jsonwebtoken')


function getUser(token){
    if(!token) return null;
    return jwt.verify(token,process.env.SECRET_KEY);
}

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    },process.env.SECRET_KEY);
}

module.exports = {
    getUser, setUser
}