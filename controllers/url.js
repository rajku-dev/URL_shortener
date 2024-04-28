const {URL}= require('../models/url')

const shortid= require('shortid')

async function handleGetAllURL (req,res){
    if(!req.user) return res.redirect('/signup')
    const user= req.user;
    const allURL = await URL.find({createdBy: user._id});
    return res.render('urls',{
        allURL: allURL
    });
}

async function handlePostURL (req,res){
    console.log('from post url method')
    if(!req.user) return res.redirect('/signup');
    console.log('user exists')
    const user= req.user;
    console.log(user)
    const redirectURL=req.body.redirectURL;
    if(!redirectURL) res.status(400).json({msg: 'Please provide with the redictedURL'})
    const shortID= shortid();
    await URL.create(
        {
            shortID: shortID,
            redirectURL: redirectURL,
            totalClicks:0,
            createdBy: user._id
        }
    )
    return res.render('home',{
        id: shortID,
        username: user.name
    })
}

async function handleRedirectToURL (req,res){
    const shortID= req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        { shortID },
        { $inc: { totalClicks: 1 } },
        { new: true } 
    );
    return res.redirect(entry.redirectURL)
}

async function handleDeleteURL (req,res){
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndDelete({
        shortID: shortID
    })
    if(!entry) return res.status(404).json({msg:`URL with shortID ${shortID} was never created`})
    return res.json({msg : `User with redirectedURL ${entry.redirectURL} has been deleted`})
}

module.exports={
    handleGetAllURL, handlePostURL, handleRedirectToURL, handleDeleteURL
}
