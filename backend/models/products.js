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
    richDescription: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
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
// computed the id value and return it with different key ==> 'id' instead of '_id'
productSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
productSchema.set('toJSON', {
    virtuals: true,
})

exports.Product = mongoose.model('Product', productSchema)
