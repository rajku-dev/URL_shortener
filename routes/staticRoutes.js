const express = require('express')
const {getUser} = require('../service/auth')
const router = express.Router()

router.get('/', (req,res)=>{
    const uid = req.cookies?.uid;
    const user = getUser(uid);
    const username = user.name;
    return res.render('home',{
        username:username
    });
});

router.get('/login',(req,res)=>{
    return res.render('login');
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

module.exports={
    router
}