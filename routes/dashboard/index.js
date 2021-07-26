const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const dashboardController = require('../../controllers/dashboard')

//client's dashboard
router.get('/client', auth, dashboardController.dashboard_client);

//marketer's dashboard
router.get('/marketer', auth, dashboardController.dashboard_marketer);

module.exports = router;