const express = require('express')
const {User} = require('../models/user')
const {getUser,setUser} = require('../service/auth')
const router = express.Router()


router.post('/signup',async (req,res)=>{
    const {name, email, password} = req.body;
    await User.create({
        name, email, password
    })
    return res.redirect('/login');
})

router.post('/login', async (req,res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({
        email:email,
        password:password
    })
    if(!user) return res.redirect('/signup')
    const token = setUser(user);
    res.cookie('uid',token,{
        maxAge:30000
    })
    return res.redirect('/')
})

module.exports={
    router
}