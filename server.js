const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const signup = require('./routes/register')
const signin = require('./routes/login')
const dashboard = require('./routes/dashboard')
const product = require('./routes/dashboard/product')
const imageUpload = require('./routes/dashboard/imageUpload')
const password = require('./routes/password')
const clicks = require('./routes/clicks')
const dotenv = require('dotenv').config()
const mongodbConnection = require('./datasources/mongodb')






//connect to a port
const PORT = process.env.PORT || 5000

// db connection
mongodbConnection()
//Cross Origin Resource Sharing 
app.use(cors())

//Middleware for processing form submission
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//global middleware for routes
app.use('/register', signup)
app.use('/login', signin)
app.use('/dashboard', dashboard)
app.use('/products', product)
app.use('/image', imageUpload)
app.use('/password-reset', password)
app.use('/clicks', clicks)


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