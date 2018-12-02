const { Schema } = require('mongoose')

const ContactForm = new Schema({

    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    }
})

module.exports = ContactForm


