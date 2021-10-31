const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')

router.get(`/`, async (req, res) => {
    const productsList = await Product.find()
    if (!productsList) return res.status(500).json({ success: false })
    res.send(productsList)
})

router.post(`/`, (req, res) => {
    const { name, image, countInStock } = req.body
    const product = new Product({
        name,
        image,
        countInStock,
    })
    product
        .save()
        .then((productSuccessed) => {
            res.status(201).json(productSuccessed)
        })
        .catch((error) => {
            res.status(500).json({
                error,
                success: false,
            })
        })
})
module.exports = router
