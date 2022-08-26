const slugify = require('slugify')
const shortid = require('shortid')
const Category = require('../models/category')

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name, { lower: true })}-${shortid.generate()}`,
        type: req.body.type ? req.body.type : null,
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
                message: 'Category created successfully',
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
            type: item.type,
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

exports.updateCategory = async (req, res) => {
    const { _id, name, type, parentId } = req.body
    const updateCategoris = []

    if (name instanceof Array) {
        for (let index = 0; index < name.length; index++) {
            const category = {
                name: name[index],
                type: type[index],
            }

            if (parentId[index]) {
                category.parentId = parentId[index]
            }
            console.log({category})
        
            const catUpdate = await Category.findOneAndUpdate({ _id: _id[index] }, category, { new: true })
            if (catUpdate) {
                updateCategoris.push(catUpdate)
            }
            // updateCategoris.push(category)
        }

        return res.status(200).json({
            message: `${updateCategoris.length} Categories updated successfully`,
            data: updateCategoris,
        })

    } else {

        const category = {
            name: name,
            type: type,
        }

        if (parentId) {
            category.parentId = parentId
        }

        const catUpdate = await Category.findOneAndUpdate({ _id }, category, { new: true })
        if (catUpdate) {
            updateCategoris.push(catUpdate)
        }

        return res.status(200).json({
            message: `${updateCategoris.length} Category updated successfully`,
            data: updateCategoris,
        })
    }
    
}

exports.deleteCategory = async (req, res) => {
   console.log('req.body', req.body.categoryIds)
   const categoryIds = req.body.categoryIds
   console.log({categoryIds})
   let deletedCategories = []
   for (let index = 0; index < categoryIds.length; index++) {
    const element = categoryIds[index];
    const deletedCategory = await Category.findOneAndDelete({ _id: element._id })
    deletedCategories.push(deletedCategory)
   }
//    categoryIds.forEach(element => {
//         const deletedCategory = await Category.findOneAndDelete({ _id: element._id })
//         deletedCategories.push(deletedCategory)
//    });
   if (deletedCategories.length === categoryIds.length) {
        return res.status(200).json({
            message: `${deletedCategories.length} Categories deleted successfully`,
            data: deletedCategories,
        })
   } else {
        return res.status(400).json({
            message: `Something went wrong!`,
            data: [],
        })
   }
}