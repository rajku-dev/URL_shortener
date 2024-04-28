const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    shortID:{
        type:String,
        unique:true
    },

    redirectURL:{
        type:String
    },
    totalClicks:{
        type:Number
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
{timestamps:true})

const URL = mongoose.model('url',URLSchema);

module.exports={
    URL
}