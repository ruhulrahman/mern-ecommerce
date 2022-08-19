const slugify = require('slugify')
const Category = require('../models/category')

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
        parentId: req.body.parentId ? req.body.parentId : null
    }

    if (req.file) {
        categoryObj.image = process.env.API + '/public/' + req.file.filename
    }
        
    const category = new Category(categoryObj)
    category.save((error, data) => {
        if (error) return res.status(400).json({ error })

        if (data) {
            return res.status(201).json({
                message: 'Category created successfullly',
                data: data,
            })
        }
    })
    
}

function createCategories(categories, parentId = null) {

    const categoryList = []

    let mycategoryList

    if (parentId == null) {
        mycategoryList = categories.filter(item => item.parentId == undefined || item.parentId == null)
    } else {
        mycategoryList = categories.filter(item => item.parentId == parentId)
    }

    mycategoryList.map(item => {
        categoryList.push({
            _id: item._id,
            name: item.name,
            slug: item.slug,
            parentId: item.parentId,
            children: createCategories(categories, item._id),
        })
    })

    return categoryList
    
}

exports.getCategory = (req, res) => {

    Category.find({})
    .exec((error, categories) => {
        if (error) return res.status(400).json({ error })

        if (categories) {
            const categoriesList = createCategories(categories)
            return res.status(201).json({ data: categoriesList })
        }
    })
    
}