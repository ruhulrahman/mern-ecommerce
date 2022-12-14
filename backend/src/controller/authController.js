const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {


    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if (user) {
            return res.status(400).json({
                message: 'This email already exist!'
            })
        }

        const { firstName, lastName, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const _user = new User({
            firstName,
            lastName,
            email,
            hashPassword,
            username: shortid.generate()
        })

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'Something went wrong!'
                })
            }

            if (data) {
                return res.status(201).json({
                    message: 'User created successfullly',
                    user: data,
                })
            }
        })
    })
}

exports.signin = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (error) {
            return res.status(400).json({
                message: 'Something went wrong!'
            })
        }

        if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                const { firstName, lastName, email, role, fullName } = user

                return res.status(200).json({
                    message: 'User authticated successfully',
                    user: { firstName, lastName, email, role, fullName },
                    token: token,
                })
            } else {
                return res.status(400).json({
                    message: 'Password Not match'
                })
            }

        } else {
            return res.status(400).json({
                message: 'User not found'
            })
        }
    })
}
