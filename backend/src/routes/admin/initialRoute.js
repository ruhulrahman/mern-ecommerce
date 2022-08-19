const express = require('express')
const { initialData } = require('../../controller/admin/initialData')
const router = express.Router()

// router.post('/admin/signup', signUpValidator, isSignUpValidated, signup)
// router.post('/admin/signin', signInValidator, isSignInValidated, signin)
router.get('/admin/initialData', initialData)

module.exports = router