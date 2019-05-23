require('../db/mongoose')
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')

// Middlewares
const auth = require('../middleware/auth')
const serverauth = require('../middleware/serverauth')

// Router declaration
const router = new express.Router()



// Search route
router.get('/search', auth, async (req, res) => {
    try {
        if (!req.query.query) {
            throw new Error('Il faut un terme de recherche.')
        }

        let searchQuery = req.query.query.replace(',',' ')

        let result = await User.find({
            $text: {
                $search: searchQuery,
            }
        }, {
            score: { 
                $meta: "textScore"
            }
        }).sort({
            score: {
                $meta: "textScore"
            }
        }).limit(20)

        if (!result) {
            throw new Error ('Aucun utilisateur trouvé.')
        }

        res.send(result)
    } catch (e) {
        let error = e.message
        res.status(400).send(error)
    }
})



// Exports
module.exports = router