const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const path = require('path')
const signup = require('./routes/register')
const signin = require('./routes/login')
const dashboard = require('./routes/dashboard')
const product = require('./routes/dashboard/product')
const imageUpload = require('./routes/dashboard/imageUpload')
const order = require('./routes/dashboard/order')
const dotenv = require('dotenv').config()





//connect to a port
const PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise


//connect to database
// mongoose.connect(
//   process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV, 
//         {
//             useUnifiedTopology: true,
//             useNewUrlParser: true,
//             useCreateIndex: true
//         })
//         .then(() => {
//             console.log('database connected successfully!')
//         })
//         .catch(err => {
//             console.log(err)
//         })

//trial
mongoose.connect(process.env.MONGO_URI_PROD,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(() => {
            console.log('database connected successfully!')
        })
        .catch(err => {
            console.log(err)
        })
        
//allow cross-origin resource sharing 
app.use(cors())

//Middleware for processing form submission
app.use('/uploads', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//global middleware for routes
app.use('/register', signup)
app.use('/login', signin)
app.use('/dashboard', dashboard)
app.use('/products', product)
app.use('/orders', order)
app.use('/image', imageUpload)


//Error reporting
app.use((req, res, next) => {
  const error = new Error(`Page not found!`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  })
})

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))