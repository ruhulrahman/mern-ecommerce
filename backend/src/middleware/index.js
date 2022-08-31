const jwt = require('jsonwebtoken');

// File uploader library start 
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
})
exports.upload = multer({ storage: storage })
// File uploader library end 

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