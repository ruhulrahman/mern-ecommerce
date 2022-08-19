const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body })


    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if (error) return res.status(400).json({ error })

        if (cart) {

            const productId = req.body.cartItems.product
            const cartItemExist = cart.cartItems.find(item => item.product == productId)
            let condition, update, message

            if (cartItemExist) {
                condition = { "user": req.user._id, "cartItems.product": productId }
                update = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: cartItemExist.quantity + req.body.cartItems.quantity
                        }
                    }
                }
                message = 'Item quantity updated to cart successfullly'

            } else {

                condition = { user: req.user._id }
                update = {
                    "$push": {
                        cartItems: req.body.cartItems
                    }
                }
                message = 'New item added to cart successfullly'

            }
            
            Cart.findOneAndUpdate(condition, update).exec((error, data) => {
                if (error) return res.status(400).json({ error })
                if (data) {
                    return res.status(201).json({
                        message: message,
                        data: data,
                    })
                }
            })

        } else {
            
            const cartObj = {
                user: req.user._id,
                cartItems: [req.body.cartItems],
            }
            const cart = new Cart(cartObj)
            cart.save((error, data) => {
                if (error) return res.status(400).json({ error })

                if (data) {
                    return res.status(201).json({
                        message: 'Item added to cart successfullly',
                        data: data,
                    })
                }
            })
        }
    })
    
    
}


exports.getItemFromCart = (req, res) => {

    Cart.find({})
    .exec((error, cart) => {
        if (error) return res.status(400).json({ error })

        if (cart) {
            // const productList = createProducts(cart)
            return res.status(201).json({ data: cart })
        }
    })
    
}