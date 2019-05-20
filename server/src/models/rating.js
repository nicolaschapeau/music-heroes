// Requires
const User = require('./user')
const mongoose = require('mongoose')



// Model
const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    stars: {
        type: Number
    },
    count: {
        default: 0,
        type: Number
    },
    total: {
        default: 0,
        type: Number
    },
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
})



// Exports
const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating