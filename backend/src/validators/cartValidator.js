const { check, body, validationResult } = require('express-validator')

exports.addValidator = [
    body('user').notEmpty().withMessage('Please enter user'),
]

exports.isValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}