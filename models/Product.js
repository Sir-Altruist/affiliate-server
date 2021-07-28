const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)