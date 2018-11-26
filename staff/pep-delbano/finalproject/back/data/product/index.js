const mongoose = require('mongoose')

const Product = require('./schema')

module.exports = {
    Product: mongoose.model('Product', Product)
}