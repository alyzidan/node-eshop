const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    brand: {
        type: String,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
    image: String,
    countInStock: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
    },
})
exports.Product = mongoose.model('Product', productSchema)
