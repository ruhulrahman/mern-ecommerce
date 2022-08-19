const slugify = require('slugify')
const Product = require('../models/product')
const shortid = require('shortid');
const Category = require('../models/category');

exports.addProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body })

    const productObj = {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        offer: req.body.offer,
        productImages: [],
        category: req.body.categoryId,
        createBy: req.user._id,
    }
    console.log('req.files', req.files)
    
    if (req.files.length) {
        req.files.map(item => {
            productObj.productImages.push({ img: process.env.API + '/public/' + item.filename })
        })
    }

    const product = new Product(productObj)
    product.save(async (error, data) => {
        if (error) return res.status(400).json({ error })

        if (data) {
            const product = await Product.findById({_id: data._id})
                        .select('_id name slug description price quantity productImages category')
                        // .populate('category')
                        .populate({ path: 'category', select: '_id name' })
                        .exec()
            return res.status(201).json({
                message: 'Product created successfullly',
                data: product,
            })
        }
    })
    
}

function createProducts(products, parentId = null) {

    const categoryList = []

    let mycategoryList

    if (parentId == null) {
        mycategoryList = products.filter(item => item.parentId == undefined || item.parentId == null)
    } else {
        mycategoryList = products.filter(item => item.parentId == parentId)
    }

    mycategoryList.map(item => {
        categoryList.push({
            _id: item._id,
            name: item.name,
            slug: item.slug,
            children: createProducts(products, item._id),
        })
    })

    return categoryList
    
}

exports.getProduct = (req, res) => {

    Product.find({})
    .exec((error, products) => {
        if (error) return res.status(400).json({ error })

        if (products) {
            // const productList = createProducts(products)
            return res.status(201).json({ data: products })
        }
    })
    
}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params

    Category.findOne({ slug: slug })
    .exec((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) {

            Product.find({ category: category._id })
            .exec((error, products) => {
                if (error) return res.status(400).json({ error })
        
                if (products) {
                    const productsByPrice = {
                        under5k: products.filter(item => item.price <= 5000),
                        under10k: products.filter(item => item.price > 5000 && item.price <= 10000),
                        under15k: products.filter(item => item.price > 10000 && item.price <= 15000),
                        under20k: products.filter(item => item.price > 15000 && item.price <= 20000),
                        under25k: products.filter(item => item.price > 20000 && item.price <= 25000),
                        under30k: products.filter(item => item.price > 25000 && item.price <= 30000),
                        under50k: products.filter(item => item.price > 30000 && item.price <= 50000),
                        above50k: products.filter(item => item.price > 50000),
                    }
                    return res.status(200).json({ 
                        products, productsByPrice
                    })
                }
            })

        }
    })
    
}