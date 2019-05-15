require('../db/mongoose')
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')

// Middlewares
const auth = require('../middleware/auth')

// Router declaration
const router = new express.Router()



// Chat routes
// ->
// Create a chat
router.post('/chats', auth, async (req, res) => {
    const user = req.user

    try {
        if (!req.body.target || req.body.target === user._id.toString()) {
            return res.status(400).send({ message: 'Aucun correspondant.' })
        }

        const target = await User.findById(req.body.target)

        if (!target) {
            return res.status(400).send({ message: 'Aucun correspondant.' })
        }

        // Get actual chat and check if no duplicate
        await user.populate({
            path: 'chats',
        }).execPopulate()

        let duplicate = !user.chats.every((chat) => {
            return chat.users.every((user) => {
                return (user.user.toString() !== target._id.toString())
            })
        })

        if (duplicate === true) {
            return res.status(400).send({ message: 'Impossible de dupliquer une conversation.' })
        }

        let users = []
        users = users.concat({
            user: user._id
        })
        users = users.concat({
            user: target._id
        })
        const chat = await new Chat({
            users
        })

        await chat.save()
        res.send({ success: true, chat })
    } catch (e) {
        let error = e.message
        return res.status(400).send({ success: false, error })
    }
})



// Get all user's chats
router.get('/chats/me', auth, async (req, res) => {
    let user = req.user

    try {
        // Get all users chat
        await user.populate({
            path: 'chats',
        }).execPopulate()

        
        
        // Get last message in chat
        user.chats.forEach(async chat => {
            await chat.populate({
                path: 'messages',
                options: {
                    limit: 1
                }
            }).execPopulate()
        })
        


        res.send({ success: true, chats: user.chats })
    } catch (e) {
        let error = e.message
        return res.status(400).send({ success: false, error})
    }
})



// Get a chat
router.get('/chats/:id', auth, async (req, res) => {
    try {
        let chat = await Chat.findById(req.params.id)

        if (!chat) {
            return res.status(400).send({ message: 'Impossible de trouver ce chat.' })
        }

        await chat.populate({
            path: 'messages',
            options: {
                limit: 10,
                skip: parseInt(req.query.skip * 10),
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()

        res.send({ success: true, chat, messages: chat.messages })
    } catch (e) {
        let error = e.message
        return res.status(400).send({ success: false, error })
    }
})


// Create a message
router.post('/chats/:id', auth, async (req, res) => {
    const user = req.user

    try {
        let valid = await Chat.findById(req.params.id)

        if (!req.body.content) {
            return res.status(400).send({ message: 'Message vide.' })
        }

        if (!valid) {
            return res.status(400).send({ message: 'Impossible de trouver ce chat.' })
        }

        let message = {
            room: mongoose.Types.ObjectId(req.params.id),
            user: user._id,
            content: req.body.content
        }

        message = await new Message(message)

        if (!message) {
            res.status(400).send({ success: true, message: 'Impossible de créer ce message.' })
        }

        message.save()
        res.send(message)
    } catch (e) {
        let error = e.message
        return res.status(400).send({ success: false, error })
    }
})



// Exports
module.exports = router