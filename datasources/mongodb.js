const mongoose = require('mongoose')

mongoose.Promise = global.Promise

async function db(){
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            })
        connection ? console.log('database connected successfully!') : console.log('unable to connect')
    } catch (error) {
        console.log(err)
    }
}

module.exports = db;