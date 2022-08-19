const express = require('express')
const { signup, signin } = require('../controller/authController')
const { signUpValidator, isSignUpValidated, signInValidator, isSignInValidated } = require('../validators/authValidator')
const router = express.Router()

router.post('/signup', signUpValidator, isSignUpValidated, signup)
router.post('/signin', signInValidator, isSignInValidated, signin)
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({
//         user: 'profile data'
//     })
// })

module.exports = router