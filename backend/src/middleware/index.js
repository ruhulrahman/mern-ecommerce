const jwt = require('jsonwebtoken');
exports.requireSignin = (req, res, next) => {

    console.log('req.headers.authorization', req.headers.authorization)

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = user
        } else {
            return res.status(400).json({ message: "Please provide valid token" })    
        }

    } else {
        return res.status(400).json({ message: "Authorization required" })    
    }

    next()

}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user') {
        return res.status(400).json({ message: "Access denied" })
    }

    next()
}

exports.adminMiddleware = (req, res, next) => {


    if(req.user.role !== 'admin') {
        return res.status(400).json({ message: "Access denied" })
    }

    next()

}

exports.adminOrUserMiddleware = (req, res, next) => {
    console.log('middleware role', req.user.role)

    if(req.user.role == 'admin' || req.user.role == 'user') {
        next()
    } else {
        return res.status(400).json({ message: "Access denied" })
    }

}