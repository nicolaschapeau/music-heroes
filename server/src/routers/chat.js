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
        await req.user.populate({
            path: 'chats'
        }).execPopulate()

        let duplicate = !req.user.chats.every((chat) => {
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
        res.send(chat)
    } catch (e) {
        error = e.message
        return res.status(400).send(error)
    }
})



// Get all user's chats
router.get('/chats/me', auth, async (req, res) => {
    let user = req.user

    try {
        // Get all users chat
        await user.populate({
            path: 'chats'
        }).execPopulate()

        // // Get avatars for every user in chat
        // chats.map(chat => {
        //     let to = chat.users.find(user => user.user.toString() !== user._id.toString())
        //     chat.to = to.user
        //     return chat
        // })

        // Get last message in chat
        user.chats.forEach(async chat => {
            await chat.populate({
                path: 'messages',
                options: {
                    limit: 1
                }
            }).execPopulate()
        })
        res.send(user.chats)
    } catch (e) {
        error = e.message
        return res.status(400).send(error)
    }
})


// Exports
module.exports = router