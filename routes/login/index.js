const express = require('express')
const router = express.Router()
const loginController = require('../../controllers/login')



//process client's login
router.post('/client', loginController.process_client_login)
//process marketer's login
router.post('/marketer', loginController.process_marketer_login)

  

module.exports = router