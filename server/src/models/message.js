// Requires
const mongoose = require('mongoose')
const validator = require('validator')



// Model
const messageSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chat'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: 'String',
        required: true    
    }
}, {
    timestamps: true
})



// Exports
const Message = mongoose.model('Message', messageSchema)
module.exports = Message