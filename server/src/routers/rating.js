require('../db/mongoose')
const User = require('../models/user')
const Rating = require('../models/rating')
const express = require('express')

// Middlewares
const auth = require('../middleware/auth')

// Router declaration
const router = new express.Router()



// Ratings routes
// ->
// Create rating



// Export
module.exports = router