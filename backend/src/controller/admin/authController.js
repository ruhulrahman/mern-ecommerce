const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if (user) {
            return res.status(400).json({
                message: 'This email already exist for admin!'
            })
        }

        const { firstName, lastName, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const _user = new User({
            firstName,
            lastName,
            email,
            hashPassword,
            username: shortid.generate(),
            role: 'admin'
        })

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'Something went wrong!'
                })
            }

            if (data) {
                return res.status(201).json({
                    message: 'Admin created successfullly',
                    user: data,
                })
            }
        })
    })
}

exports.signin = (req, res) => {
    // console.log('req.body', req.body)

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (error) {
            return res.status(400).json({
                message: 'Something went wrong!'
            })
        }

        if (user) {
            if (user.authenticate(req.body.password) && user.role == 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                // const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: 60 });
                const { _id, firstName, lastName, email, role, fullName } = user

                res.cookie('token', token, { expiresIn: '1d' })
                // res.cookie('token', token, { expiresIn: 60 })

                return res.status(200).json({
                    message: 'Admin authticated successfully',
                    user: { _id, firstName, lastName, email, role, fullName },
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

exports.logout = (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({
        message: 'Admin logout successfully'
    })
}