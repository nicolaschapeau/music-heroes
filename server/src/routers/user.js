require('../db/mongoose')
const User = require('../models/user')
const Rating = require('../models/rating')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const sharp = require('sharp')

// Middlewares
const auth = require('../middleware/auth')

// Router declaration
const router = new express.Router()



// User routes
// ->
// Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        let instruments = ['guitar', 'piano', 'flute']
        let validInstruments = user.instruments.every(instrument => instruments.includes(instrument.toLowerCase()))

        if (!validInstruments) {
            throw new Error('Instruments invalides.')
        }

        await user.save()
        let rating = await new Rating({ user: user._id })
        await rating.save()

        res.status(201).send({ success: true, user })
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Get user
router.get('/users/me', auth, async (req, res) => {
    try {
        res.send({ success: true, user: req.user })
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Update user
router.patch('/users/me', auth, async (req, res) => {
    try {
        // Validate params
        let allowedUpdates = ['name', 'email', 'password', 'bio', 'instruments']
        let updates = Object.keys(req.body)

        let valid = updates.every(update => allowedUpdates.includes(update))

        if (!valid) {
            throw new Error('Arguments invalides.')
        }

        let allowedInstruments = ['guitar', 'piano', 'flute']
        let validInstruments = req.body.instruments.every(instrument => allowedInstruments.includes(instrument))

        if (!validInstruments) {
            throw new Error('Instruments invalides.')
        }

        // Update user
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        
        res.send({ success: true, user: req.user })
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()

        res.send({ success: true })
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

const upload = multer({
    limits: {
        fileSize: 2048000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return callback(new Error('File must be an image'))
        }

        callback(undefined, true)
    }
})

// Set user's avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
        req.user.avatar = buffer
        req.user.save()

        res.send()
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Set user's banner
router.post('/users/me/banner', auth, upload.single('banner'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize(1440, 250).png().toBuffer()
        req.user.banner = buffer
        req.user.save()

        res.send()
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Get user avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error('No user or avatar.')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})

// Get user banner
router.get('/users/:id/banner', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.banner) {
            throw new Error('No user or banner')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.banner)
    } catch (e) {
        const error = e.message
        res.status(400).send({ success: false, error })
    }
})


// Export
module.exports = router