const express = require('express')
const { getPages, createPage } = require('../../controller/admin/pageController')
const { adminMiddleware, requireSignin, upload } = require('../../middleware')
const router = express.Router()



router.post('/page/create', requireSignin, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' },
]), createPage)

router.get('/page/:cId/:type', getPages)

module.exports = router