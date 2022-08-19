const { check, validationResult } = require('express-validator')

exports.signUpValidator = [
    check('firstName').notEmpty().withMessage('First name is require'),
    check('lastName').notEmpty().withMessage('Last name is require'),
    check('email').isEmail().withMessage('Please enter valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 digits'),
]

exports.isSignUpValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}

exports.signInValidator = [
    check('email').isEmail().withMessage('Please enter valid email'),
    check('password').notEmpty().withMessage('Please enter your password'),
]

exports.isSignInValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}