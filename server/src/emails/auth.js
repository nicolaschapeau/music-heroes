const sgMail = require('@sendgrid/mail')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const randomatic = require('randomatic')



// Set api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const registerEmail = async (user) => {
    // Generate token
    const random = randomatic('Aa0', 12)
    const randomDB = bcrypt.hashSync(random, 2)
    user.hash = randomDB
    user.save()

    // Build token
    const emailToken = user._id + '.' + random
    console.log(emailToken)

    // Send email
}



// Export
module.exports = {
    registerEmail
}