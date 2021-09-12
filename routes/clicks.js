const express = require('express')
const router = express.Router()
// const auth = require('../middleware/auth')
const clickController = require('../controllers/clicks')

router.post('/',  clickController.addClick)
router.get('/',  clickController.getClick)

module.exports = router;