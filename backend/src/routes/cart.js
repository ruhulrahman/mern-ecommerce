const express = require('express')
const { addItemToCart, getItemFromCart } = require('../controller/cartController')
const router = express.Router()
const { requireSignin, userMiddleware } = require('../middleware')
const { addValidator, isValidated } = require('../validators/cartValidator')


// router.post('/user/cart/addtocart', addValidator, isValidated, requireSignin, adminMiddleware, addItemToCart)
router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)
router.get('/user/cart/getCart', requireSignin, getItemFromCart)

module.exports = router