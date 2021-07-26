const express = require('express')
const router = express.Router()
const registerController = require('../../controllers/register')


//process client's info
router.post('/client', registerController.process_client_info)
//process marketer's info
router.post('/marketer', registerController.process_marketer_info)

module.exports = router