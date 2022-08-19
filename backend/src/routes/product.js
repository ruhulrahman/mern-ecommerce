const express = require('express')
const router = express.Router()
const { addProduct, getProduct, getProductsBySlug } = require('../controller/productController')
const { requireSignin, adminMiddleware } = require('../middleware')
const { addValidator, isValidated } = require('../validators/productValidator')
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/product'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
})

const upload = multer({ storage: storage })

// router.post('/product/create', addValidator, isValidated, requireSignin, adminMiddleware, upload.single('productImages'), addProduct)
router.post('/product/create', requireSignin, adminMiddleware, upload.array('productImages'), addProduct)
router.get('/product/getProduct', requireSignin, getProduct)
router.get('/product/:slug', getProductsBySlug)

module.exports = router