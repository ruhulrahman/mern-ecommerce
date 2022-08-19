const express = require('express')
const router = express.Router()
const { addCategory, getCategory } = require('../controller/categoryController')
const { requireSignin, adminMiddleware, adminOrUserMiddleware } = require('../middleware')
const { addCategoryValidator, isAddCategoryValidated } = require('../validators/categoryValidator')
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/category'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
})

const upload = multer({ storage: storage })

// router.post('/category/create', addCategoryValidator, isAddCategoryValidated, requireSignin, adminMiddleware, upload.single('image'), addCategory)
router.post('/category/create', requireSignin, adminMiddleware, upload.single('image'), addCategory)
router.get('/category/getCategory', requireSignin, adminOrUserMiddleware, getCategory)


module.exports = router