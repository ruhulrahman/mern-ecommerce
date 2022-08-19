const Category = require('../../models/category')
const Product = require('../../models/product')


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

exports.initialData = async (req, res) => {
    const categories = await Category.find({})
                                // .populate({
                                //     path: 'parentId',
                                //     model: Category
                                // })
                                .exec()
    const products = await Product.find({})
                        .select('_id name slug description price quantity productImages category')
                        // .populate('category')
                        .populate({ path: 'category', select: '_id name' })
                        .exec()

    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}