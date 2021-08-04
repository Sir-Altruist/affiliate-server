const express = require('express')
const router = express.Router()
const password = require('../../controllers/forgotPassword')


router.post('/', password.forgotPassword)

module.exports = router;