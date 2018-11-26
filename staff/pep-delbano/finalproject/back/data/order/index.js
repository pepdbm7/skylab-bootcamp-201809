const mongoose = require('mongoose')

const Order = require('./schema')

module.exports = {
    Order: mongoose.model('Order', Order)
}