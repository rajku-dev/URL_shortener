const express = require('express')

const {handleGetAllURL,handlePostURL, handleRedirectToURL, handleDeleteURL} = require('../controllers/url')

const router = express.Router()

router.route('/').get(handleGetAllURL);

router.route('/').post(handlePostURL);

router.route('/:shortID').get(handleRedirectToURL).delete(handleDeleteURL);

module.exports={
    router
}
