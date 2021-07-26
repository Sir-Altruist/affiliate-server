const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const orderController = require('../../controllers/order')
const confirmMarketer = require('../../middleware/confirm')


//get orders
router.get('/', auth, orderController.get_all_orders)
// add order
router.post('/marketer/:marketerId/addorder', auth, orderController.create_orders)
//get a single order
router.get('/:orderId', auth, confirmMarketer, orderController.get_single_order)
//edit order
router.put('/update/:orderId', auth, confirmMarketer, orderController.edit_order)
//delete order
router.delete('/:orderId', auth, confirmMarketer, orderController.delete_order)

module.exports = router