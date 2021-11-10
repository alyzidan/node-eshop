const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
})
// computed the id value and return it with different key ==> 'id' instead of '_id'
orderSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
orderSchema.set('toJSON', {
    virtuals: true,
})

exports.User = mongoose.model('OrderItem', orderItemSchema)
exports.orderItemSchema = orderItemSchema
