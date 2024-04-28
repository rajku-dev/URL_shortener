const {getUser,setUser} = require('../service/auth')

function restrictToLoginUsersOnly(req,res,next){

    if(!req.cookies) return res.redirect('/signup');

    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/signup");

    const user = getUser(userUid);

    if (!user) return res.redirect("/signup");
    console.log(1)
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    res.user = user;
    next();
}

module.exports={
    restrictToLoginUsersOnly,checkAuth
}

