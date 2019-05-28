require('../db/mongoose')
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')

// Middlewares
const auth = require('../middleware/auth')
const serverauth = require('../middleware/serverauth')

// Router declaration
const router = new express.Router()



// Chat routes
// ->
// Create a chat
router.post('/chats', auth, async (req, res) => {
    const user = req.user

    try {
        if (!req.body.target || req.body.target === user._id.toString()) {
            return res.status(400).send({ success: false, message: 'Aucun correspondant.' })
        }

        const target = await User.findById(req.body.target)

        if (!target) {
            return res.status(400).send({ success: false, message: 'Aucun correspondant.' })
        }

        // Get actual chat and check if no duplicate
        await user.populate({
            path: 'chats',
        }).execPopulate()

        let savedDuplicate = null
        let duplicate = !user.chats.every((chat) => {
            return chat.users.every((user) => {
                if (user.user.toString() !== target._id.toString()) {
                    savedDuplicate = chat.toJSON()
                    return false
                }
            })
        })

        savedDuplicate.users.forEach((user, index) => {
            if (user.user.toString() === req.user._id.toString()) {
                console.log(req.user.firstname, req.user.lastname)
                let firstname = req.user.firstname.charAt(0).toUpperCase() + req.user.firstname.slice(1)
                let lastname = req.user.lastname.charAt(0).toUpperCase() + req.user.lastname.slice(1)
                let fullname = `${firstname} ${lastname}`
                savedDuplicate.users[index].name = fullname
            } else {
                console.log(req.user.firstname, req.user.lastname)
                let firstname = target.firstname.charAt(0).toUpperCase() + target.firstname.slice(1)
                let lastname = target.lastname.charAt(0).toUpperCase() + target.lastname.slice(1)
                let fullname = `${firstname} ${lastname}`
                savedDuplicate.users[index].name = fullname
            }
        })

        if (duplicate) {
            return res.status(200).send({ success: false, message: 'Impossible de dupliquer une conversation.', chat: savedDuplicate })
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

        // Create JSON Object with chats
        let chats = []
        user.chats.forEach((chat) => {
            chats.push(chat.toJSON())
        })

        // Add avatars to users
        for (let index = 0; index < user.chats.length; index++) {
            const chat = user.chats[index];
            
            for (let i = 0; i < chat.users.length; i++) {
                const user = chat.users[i];
                let avatar = null
                let name = null

                // If actual user
                if (user.user.toString() === req.user._id.toString()) {
                    avatar = req.user.avatar
                    let firstname = req.user.firstname.charAt(0).toUpperCase() + req.user.firstname.slice(1)
                    let lastname = req.user.lastname.charAt(0).toUpperCase() + req.user.lastname.slice(1)
                    name = `${firstname} ${lastname}`

                    if (avatar) {
                        avatar = avatar.toString('base64')
                    }
                } else {
                    let target = await User.findById(user.user)
                    let firstname = target.firstname.charAt(0).toUpperCase() + target.firstname.slice(1)
                    let lastname = target.lastname.charAt(0).toUpperCase() + target.lastname.slice(1)
                    name = `${firstname} ${lastname}`

                    if (target.avatar) {
                        avatar = target.avatar.toString('base64')
                    }
                }

                chats[index].users[i].avatar = avatar
                chats[index].users[i].name = name
            }
        }

        // Get last message in chat
        for (let index = 0; index < user.chats.length; index++) {
            const chat = user.chats[index];
            
            await chat.populate({
                path: 'messages',
                options: {
                    limit: 1
                }
            }).execPopulate()

            let messages = []
            chat.messages.forEach((message) => {
                messages.push(message.toJSON())
            })
            chats[index].message = messages[index]
        }


        res.send({ success: true, chats })
    } catch (e) {
        let error = e.message
        return res.status(400).send({ success: false, error })
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
                    createdAt: -1,
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
router.post('/chats/:id', serverauth, async (req, res) => {
    const user = req.body.user

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
            user,
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