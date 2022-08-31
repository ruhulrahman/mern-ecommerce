const mongoose = require('mongoose')
const pageSchema = new mongoose.Schema({

    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    banner: { type: String },
    banners: [
        { 
            img: { type: String },
            navigateTo: { type: String },
        }
    ],
    products: [
        { 
            img: { type: String },
            navigateTo: { type: String },
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, { timestamps: true })

module.exports = mongoose.model('Page', pageSchema)