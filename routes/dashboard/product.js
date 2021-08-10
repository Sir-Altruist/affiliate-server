const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const productController = require('../../controllers/product')





// add product
router.post('/addproduct', auth, productController.upload_product)
// get all products
router.get('/', productController.get_all_products)
//get user specific products
router.get('/user', auth, productController.get_user_products)
//get a single product
router.get('/:productId', productController.get_single_product)
//edit a single product
router.put('/update/:productId', auth, productController.edit_product)
//delete a product
router.delete('/:productId', auth, productController.delete_product)


module.exports = router