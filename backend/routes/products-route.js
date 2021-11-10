const express = require('express')
const router = express.Router()
const { Product } = require('models/products')
const { Category } = require('../models/categories')
const mongoose = require('mongoose')

router.get(`/`, async (req, res) => {
	// If request has paramenters convert them into an Array and Store in filters Object
	let category = req.query.category?.split(',') || ''
	let filters = { category }
	const productsList = await Product.find()
	// const productsList = await Product.find().select('name -_id')
	if (!productsList) return res.status(500).json({ success: false })
	res.send(productsList)
})
router.delete('/:id', async (req, res) => {
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).send('Invalid Product id')
	}
	try {
		const deleteProduct = await Product.findByIdAndRemove(id)
		return res.status(200).json({
			success: true,
			message: 'the product was successfully deleted',
		})
	} catch (e) {
		return res.status(404).json({
			error: e,
			message: 'connot delete the requested product',
			success: false,
		})
	}
})
router.get('/:id', async (req, res) => {
	const { id } = req.params
	const product = await Product.findById(id).populate('category')
	if (!product)
		return res.status(500).json({
			message: 'could not find the requested product',
			success: false,
		})
	return res.status(200).send(product)
})

router.put('/:id', async (req, res) => {
	const { id } = req.params
	const { name, description, richDescription, brand, price, category, numReviews, isFeatured, image, countInStock, rating } = req.body
	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).send('Invalid Product id')
	}
	const categoryCheck = await Category.findById(category)
	if (!categoryCheck) return res.status(400).send('Invalid Category id')
	const product = await Product.findByIdAndUpdate(
		id,
		{
			name,
			description,
			richDescription,
			brand,
			price,
			category,
			numReviews,
			isFeatured,
			image,
			countInStock,
			rating,
		},
		{
			new: true,
		}
	)
	if (!product) {
		return res.status(400).json({
			message: 'operation could not be completed',
			error: product,
		})
	}
	return res.status(200).send(product)
})

router.post(`/`, async (req, res) => {
	const { name, description, richDescription, brand, price, category, numReviews, isFeatured, image, countInStock, rating } = req.body
	const cetegoryCheck = await Category.findById(category)
	if (!cetegoryCheck) return res.status(400).json({ message: 'no such category exists', success: false })

	const product = new Product({
		name,
		description,
		richDescription,
		brand,
		price,
		category,
		numReviews,
		isFeatured,
		image,
		countInStock,
		rating,
	})
	const productSaveOperation = await product.save()
	if (!productSaveOperation) {
		return res.status(500).json({ message: 'product cannot be added', success: false })
	}
	res.status(201).send(productSaveOperation)
})
router.get('/get/featured/:count', async (req, res) => {
	const { count } = req.params || 2
	const products = await Product.find({ isFeatured: true }).limit(+count)
	if (!products) {
		res.status(500).json({ success: false })
	}
	return res.send(products)
})
router.get('/get/count', async (req, res) => {
	const productCount = await Product.countDocuments()
	if (!productCount) {
		res.status(500).json({
			success: false,
			message: 'Operation failed no count detected',
		})
	}
	return res.status(200).send({ productCount })
})

module.exports = router
