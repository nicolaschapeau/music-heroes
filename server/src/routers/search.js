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

        let searchQuery = req.query.query.replace(' ', '|')

        let result = await User.find({
            "$or": [ 
                {
                    firstname: {
                        $regex: searchQuery,
                    },
                }, {
                    lastname: {
                        $regex: searchQuery,
                    }
                }
            ]
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

        // Convert to updatable object
        let resultArray = []
        result.forEach((user) => {
            resultArray.push(user.toJSON())
        })

        // Search if user is in results so it can be removed
        let index = resultArray.findIndex((user) => {
            if (user._id.toString() == req.user._id.toString()) {
                return user
            }
        })
        if (index !== null && index !== -1) {
            resultArray.splice(index, 1)
        }

        res.send(resultArray)
    } catch (e) {
        let error = e.message
        res.status(400).send(error)
    }
})



// Exports
module.exports = router