const { check, validationResult } = require('express-validator')

exports.addCategoryValidator = [
    check('name').notEmpty().withMessage('Please enter category name'),
]

exports.isAddCategoryValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}