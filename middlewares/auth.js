const {getUser,setUser} = require('../service/auth')

function restrictToLoginUsersOnly(req,res,next){

    if(!req.cookies) return res.redirect('/signup');
    console.log(1)

    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/signup");
    console.log(1)

    const user = getUser(userUid);
    console.log(1)

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

