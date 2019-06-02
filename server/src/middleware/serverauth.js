const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')


// Middleware auth : is user identified ?
const serverauth = async (req, res, next) => {
    try {
        // Check if cookies exists
        if (process.env.SERVER_KEY !== req.body.server_key) {
            throw new Error('You need to be authenticated to perform this action.')
        }

        next()
    } catch (e) {
        const error = e.message
        res.status(400).send({ error })
    }
}



// Export
module.exports = serverauth