const { check, body, validationResult } = require('express-validator')

exports.addValidator = [
    body('name').notEmpty().withMessage('Please enter product name'),
    check('price').notEmpty().withMessage('Please enter price'),
    check('description').notEmpty().withMessage('Please enter description'),
]

exports.isValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}