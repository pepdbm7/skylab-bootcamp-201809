const mongoose = require('mongoose')
const User = require('./schemas/schema-order')
const Order = require('./schemas/schema-order')
const Product = require('./schemas/schema-order')
const ContactForm = require('./schemas/schema-contactform')


module.exports = {
    mongoose,
    models: {
    Order: mongoose.model('Order', Order),
    User: mongoose.model('User', User),
    Product: mongoose.model('Product', Product),
    ContactForm: mongoose.model('ContactForm', ContactForm)
    }
}
