const express = require('express')
const router = express.Router()
const { Product } = require('../models/products')
const { Category } = require('../models/categories')

router.get(`/`, async (req, res) => {
    const productsList = await Product.find()
    if (!productsList) return res.status(500).json({ success: false })
    res.send(productsList)
})

router.post(`/`, async (req, res) => {
    const {
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
    } = req.body
    const cetegoryCheck = await Category.findById(category)
    if (!cetegoryCheck)
        return res
            .status(400)
            .json({ message: 'no such category exists', success: false })

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
        return res
            .status(500)
            .json({ message: 'product cannot be added', success: false })
    }
    res.status(201).send(productSaveOperation)
})
module.exports = router
