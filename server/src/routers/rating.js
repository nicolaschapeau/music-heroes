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
router.post('/recommands', auth, async (req, res) => {
    try {
        if (!req.body.target || req.body.target == req.user._id) {
            throw new Error(`Impossible de noter cet utilisateur.`)
        }

        let rating = await Rating.findOne({ user: req.body.target })

        let valid = rating.users.every((user) => {
            if (user.user.toString() === req.user._id.toString()) {
                return false
            }

            return true
        })

        if (!valid) {
            throw new Error(`Vous avez déjà noté cet utilisateur.`)
        }

        // Add rating
        let users = rating.users
        users = users.concat({
            user: req.user._id
        })

        rating.total++
        rating.users = users

        rating.save()
        res.status(201).send({ success: true, rating })
    } catch (e) {
        error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Get rating
router.get('/recommands/:id', auth, async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('Il faut renseigner un utilisateur.')
        }

        let rating = await Rating.findOne({ user: req.params.id })

        if (!rating) {
            throw new Error('Utilisateur introuvable.')
        }

        res.send({ success: true, rating: rating })
    } catch (e) {
        error = e.message
        res.status(400).send({ success: false, error })
    }
})



// Export
module.exports = router