const Page = require('../../models/page')

exports.createPage = (req, res) => {
    console.log('req.files', req.files)
    console.log('req.body', req.body)

    const { banners, products } = req.files

    if (banners && banners.length) {
        req.body.banners = banners.map(item => (
            {
                img: process.env.API + '/public/' + item.filename,
                navigateTo: `/bannerClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,
            }
        ))
    }

    if (products && products.length) {
        req.body.products = products.map(item => (
            {
                img: process.env.API + '/public/' + item.filename,
                navigateTo: `/productClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,
            }
        ))
    }

    req.body.createdBy = req.user._id

    const page = new Page(req.body)
    page.save((error, data) => {
        if (error) return res.status(400).json({ error })

        if (data) {
            return res.status(201).json({
                message: 'Page created successfully',
                data: data,
            })
        }
    })    
}


exports.getPages = (req, res) => {

    Page.find({})
    .exec((error, page) => {
        if (error) return res.status(400).json({ error })

        if (page) {
            return res.status(201).json({ data: page })
        }
    })
    
}