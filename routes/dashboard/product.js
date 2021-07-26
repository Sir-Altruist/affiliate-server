const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const multer = require('multer')
const productController = require('../../controllers/product')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null,  file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
         //accept file
        cb(null, true)
    }else {
        //reject file
        cb(new Error('Acceptable file type is either jpeg or png'), false)
    }
}
const upload = multer({
    storage,
    fileSize: 1024 * 1024 * 5,
    fileFilter
})


// add product
router.post('/client/:clientId/addproduct', auth, upload.single('productImg'), productController.upload_product)
// get all products
router.get('/', productController.get_all_products)
//get a single product
router.get('/:productId', productController.get_single_product)
//edit a single product
router.put('/update/:productId', auth, productController.edit_product)
//delete a product
router.delete('/:productId', auth, productController.delete_product)

module.exports = router