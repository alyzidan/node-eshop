const express = require('express')
const router = express.Router()
const { User } = require('../models/users')
const bcrybt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.get(`/`, async (req, res) => {
    const usersList = await User.find()
    if (!usersList) return res.status(500).json({ success: false })
    res.status(200).send(usersList)
})

// register new user
router.post('/', async (req, res) => {
    const {
        name,
        email,
        passwordHash,
        street,
        apartment,
        city,
        zip,
        country,
        phone,
        isAdmin,
    } = req.body

    let user = new User({
        name,
        email,
        passwordHash: bcrybt.hashSync(passwordHash),
        street,
        apartment,
        city,
        zip,
        country,
        phone,
        isAdmin,
    })
    try {
        user = await user.save()
    } catch (error) {}
    if (!user) {
        res.status(404).json({
            success: false,
            message: `adding user operation failed`,
        })
    }
    res.send(user)
})

//login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const secret = process.env.SECRET

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: `both email and password are required for the login`,
        })
    }

    let loginOperation = await User.findOne({ email })
    if (!loginOperation) {
        return res.status(404).json({
            success: false,
            message: `couldn't find user with specfied email`,
        })
    }
    if (
        loginOperation &&
        bcrybt.compareSync(password, loginOperation.passwordHash)
    ) {
        const { id, email, isAdmin } = loginOperation
        const token = jwt.sign(
            {
                id,
                isAdmin,
            },
            secret,
            { expiresIn: '1d' }
        )
        return res.status(200).send({ email, id, token })
    }
    res.status(400).send(`password is wrong`)
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
    const user = await User.findById(id).select('name email phone')
    if (!user) {
        return res.status(500).json({
            message: 'could not find the requested user',
            success: false,
        })
    }
    return res.status(200).send(user)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
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
