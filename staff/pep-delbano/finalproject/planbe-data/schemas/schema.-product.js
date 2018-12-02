const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Product = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        data: Buffer,
        required: true 
    },
    descritpion: {
        type: String,
        required: true
    }
})

module.exports = {
    Product
}

