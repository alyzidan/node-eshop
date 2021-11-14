const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
	quantity: {
		type: Number,
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products',
	},
})

// computed the id value and return it with different key ==> 'id' instead of '_id'

orderItemSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

orderItemSchema.set('toJSON', {
	virtuals: true,
})

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema)
exports.orderItemSchema = orderItemSchema
