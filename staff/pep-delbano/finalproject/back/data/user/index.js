const mongoose = require('mongoose')

const User = require('./schema')

module.exports = {
    User: mongoose.model('User', User)
}