// Requires
const mongoose = require('mongoose')
const validator = require('validator')



// Model
const chatSchema = new mongoose.Schema({
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
}, {
    timestamps: true
})



// Virtual messages storage
chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'room'
})



// Exports
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat