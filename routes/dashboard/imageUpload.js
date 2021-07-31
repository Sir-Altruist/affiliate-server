const express = require('express')
const router = express()
const multer = require('multer')
const path = require('path')
const auth = require('../../middleware/auth')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null,  `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else {
        cb('Images only!')
    }
} 
const upload = multer({
    storage,
    fileSize: 1024 * 1024 * 5,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})


router.post('/', auth, upload.single('productImg'), (req, res) => {
    res.send(`/${req.file.path.replace(/\\/g, "/")}`)
})

module.exports = router
