const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClickSchema = new Schema({
    clickTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = Click = mongoose.model('clicks', ClickSchema)