const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    products: [
        {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
],
    quantity: {
        type: Number,
        default: 1
    },
    marketer: {
        type: Schema.Types.ObjectId,
        ref: 'marketer',
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order', OrderSchema)