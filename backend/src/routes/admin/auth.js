const express = require('express')
const { signup, signin, logout } = require('../../controller/admin/authController')
const { requireSignin } = require('../../middleware')
const { signUpValidator, isSignUpValidated, signInValidator, isSignInValidated } = require('../../validators/authValidator')
const router = express.Router()

router.post('/admin/signup', signUpValidator, isSignUpValidated, signup)
router.post('/admin/signin', signInValidator, isSignInValidated, signin)
// router.post('/admin/logout', requireSignin, logout)
router.post('/admin/logout', logout)

module.exports = router