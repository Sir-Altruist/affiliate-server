const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a schema
const MarketerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    website: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    order: [
        {
            _id: Schema.Types.ObjectId,
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Marketer = mongoose.model('marketer', MarketerSchema)