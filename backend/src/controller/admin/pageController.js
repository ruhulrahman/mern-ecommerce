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

    Page.findOne({categoryId: req.body.categoryId })
    .exec((error, page) => {
        if (error) return res.status(400).json({ error })
        if (page) {
            Page.findOneAndUpdate({ categoryId: req.body.categoryId }, req.body)
            .exec((error, data) => {
                if (error) return res.status(400).json({ error })

                if (data) {
                    return res.status(201).json({
                        message: 'Page updated successfully',
                        data: data,
                    })
                }
            })
        } else {
            
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
    })    
}


exports.getPages = (req, res) => {
    console.log('req.params', req.params)
    const { cId, type } = req.params

    if (type === 'page') {
        Page.findOne({ categoryId: cId })
        .exec((error, page) => {
            if (error) return res.status(400).json({ error })
            console.log('page', page)
            if (page) {
                return res.status(200).json({ data: page })
            }
            return res.status(200).json({ data: null })
        })
    }
    
}