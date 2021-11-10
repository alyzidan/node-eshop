const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
	orderItems: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'OrderItems',
			required: true,
		},
	],
	shippingAddress1: {
		type: String,
		required: true,
	},
	shippingAddress2: {
		type: String,
		default: '',
	},
	city: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
	},
	dateOrdered: {
		type: Date,
		default: new Date(),
	},
	dateCreated: {
		type: Date,
		default: new Date(),
	},
	status: {
		type: String,
		required: true,
		default: 'pending',
	},
})
// computed the id value and return it with different key ==> 'id' instead of '_id'
orderSchema.virtual('id').get(function () {
	return this._id.toHexString()
})
orderSchema.set('toJSON', {
	virtuals: true,
})

exports.order = mongoose.model('User', orderSchema)
exports.orderSchema = orderSchema
