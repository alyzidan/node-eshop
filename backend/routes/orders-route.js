const express = require('express')
const router = express.Router()
const { User } = require('models/users')
const { Product } = require('models/products')
const { Order } = require('models/orders')
const mongoose = require('mongoose')
const { OrderItem } = require('../models/orders-items')
// get all users

router.get(`/`, async (_req, res) => {
	const ordersList = await Order.find()
	if (!ordersList) return res.status(500).json({ success: false, message: 'Filed to retrieve orders list' })
	res.status(200).send(ordersList)
})

// // register new order
router.post('/', async (req, res) => {
	const { city, zip, country, phone, totalPrice, user, orderItems, shippingAddress1, shippingAddress2, dateOrdered, dateCreated, status } = req.body
	let orderItemsIds = Promise.all(
		orderItems.map(async (orderItem) => {
			let newOrderItem = new OrderItem({
				quantity: orderItem.quantity,
				product: orderItem.product,
			})
			newOrderItem = await newOrderItem.save()
			return newOrderItem.id
		})
	)
	const orderIdsREsolved = await orderItemsIds

	let orders = new Order({
		city,
		zip,
		country,
		phone,
		totalPrice,
		user,
		orderItems: orderIdsREsolved,
		shippingAddress1,
		shippingAddress2,
		dateOrdered,
		dateCreated,
		status,
	})
	try {
		orders = await orders.save()
	} catch (error) {
		console.log('ERROR ADDING New Concept', error)
	}
	if (!orders) {
		res.status(404).json({
			success: false,
			message: `adding user operation failed`,
		})
	}
	res.send(orders)
})
// //login user
// router.post('/login', async (req, res) => {
// 	const { email, password } = req.body
// 	const secret = process.env.SECRET
// 	// validate the values are not empty
// 	if (!email || !password) {
// 		res.status(400).json({
// 			success: false,
// 			message: `both email and password are required for the login`,
// 		})
// 	}

// 	let loginOperation = await User.findOne({ email })
// 	if (!loginOperation) {
// 		return res.status(404).json({
// 			success: false,
// 			message: `couldn't find user with specfied email`,
// 		})
// 	}
// 	if (loginOperation && bcrybt.compareSync(password, loginOperation.passwordHash)) {
// 		const { id, email, isAdmin } = loginOperation
// 		const token = jwt.sign(
// 			{
// 				id,
// 				isAdmin,
// 			},
// 			secret,
// 			{ expiresIn: '1d' }
// 		)
// 		return res.status(200).send({ email, id, token })
// 	}
// 	res.status(400).send(`password is wrong`)
// })

// //delete user
// router.delete('/:id', async (req, res) => {
// 	const { id } = req.params
// 	if (!mongoose.isValidObjectId(id)) {
// 		return res.status(400).send('Invalid Product id')
// 	}
// 	try {
// 		const deleteProduct = await Product.findByIdAndRemove(id)
// 		return res.status(200).json({
// 			success: true,
// 			message: 'the product was successfully deleted',
// 		})
// 	} catch (e) {
// 		return res.status(404).json({
// 			error: e,
// 			message: 'connot delete the requested product',
// 			success: false,
// 		})
// 	}
// })
// //get user
// router.get('/:id', async (req, res) => {
// 	const { id } = req.params
// 	const user = await User.findById(id).select('name email phone isAdmin')
// 	if (!user) {
// 		return res.status(500).json({
// 			message: 'could not find the requested user',
// 			success: false,
// 		})
// 	}
// 	return res.status(200).send(user)
// })
// // get users count
// router.get('/get/count', async (req, res) => {
// 	const usersCount = await User.countDocuments()
// 	if (!usersCount) {
// 		res.status(500).json({
// 			success: false,
// 		})
// 	}
// 	return res.status(200).send({ usersCount })
// })

// //edit user
// router.put('/:id', async (req, res) => {
// 	const { id } = req.params
// 	const { name, description, richDescription, brand, price, category, numReviews, isFeatured, image, isAdmin, countInStock, rating } = req.body
// 	if (!mongoose.isValidObjectId(id)) {
// 		return res.status(400).send('Invalid Product id')
// 	}
// 	// const categoryCheck = await Category.findById(category)
// 	// if (!categoryCheck) return res.status(400).send('Invalid Category id')
// 	const user = await User.findByIdAndUpdate(
// 		id,
// 		{
// 			name,
// 			description,
// 			richDescription,
// 			brand,
// 			price,
// 			category,
// 			numReviews,
// 			isFeatured,
// 			image,
// 			countInStock,
// 			rating,
// 			isAdmin,
// 		},
// 		{
// 			new: true,
// 		}
// 	)
// 	if (!user) {
// 		return res.status(400).json({
// 			message: 'operation could not be completed',
// 			error: product,
// 		})
// 	}
// 	return res.status(200).send(user)
// })

// router.post(`/`, async (req, res) => {
// 	const { name, description, richDescription, brand, price, category, numReviews, isFeatured, image, countInStock, rating } = req.body
// 	const cetegoryCheck = await Category.findById(category)
// 	if (!cetegoryCheck) return res.status(400).json({ message: 'no such category exists', success: false })

// 	const product = new Product({
// 		name,
// 		description,
// 		richDescription,
// 		brand,
// 		price,
// 		category,
// 		numReviews,
// 		isFeatured,
// 		image,
// 		countInStock,
// 		rating,
// 	})
// 	const productSaveOperation = await product.save()
// 	if (!productSaveOperation) {
// 		return res.status(500).json({ message: 'product cannot be added', success: false })
// 	}
// 	res.status(201).send(productSaveOperation)
// })
// router.get('/get/featured/:count', async (req, res) => {
// 	const { count } = req.params || 2
// 	const products = await Product.find({ isFeatured: true }).limit(+count)
// 	if (!products) {
// 		res.status(500).json({ success: false })
// 	}
// 	return res.send(products)
// })
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params
// 	User.findByIdAndRemove(id)
// 		.then((user) => {
// 			if (user) {
// 				return res.status(200).json({
// 					success: true,
// 					message: 'user deleted successfully',
// 				})
// 			}
// 			return res.status(404).json({
// 				success: false,
// 				message: 'User not found or already deleted ',
// 			})
// 		})
// 		.catch((error) => res.status(500).json({ success: false, error: error }))
// })
// router.get('/get/count', async (req, res) => {
// 	const productCount = await Product.countDocuments()
// 	if (!productCount) {
// 		res.status(500).json({
// 			success: false,
// 			message: 'Operation failed no count detected',
// 		})
// 	}
// 	return res.status(200).send({ productCount })
// })

module.exports = router
