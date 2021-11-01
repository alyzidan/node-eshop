const express = require('express')
const router = express.Router()
const { Category } = require('../models/categories')

router.get('/', async (req, res) => {
    const categories = await Category.find()
    if (!categories)
        return res
            .status(500)
            .json({ success: false, message: 'cannot find any categories' })
    return res.send(categories)
})

router.post('/', async (req, res) => {
    const { name, color, icon, image } = req.body
    let category = new Category({ name, color, icon, image })
    categoryAction = await category.save()
    if (!categoryAction) res.status(404).json("ERROR DIDN'T complete")
    res.send(categoryAction)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, icon, color } = req.body
    const category = await Category.findByIdAndUpdate(
        id,
        {
            name,
            color,
            icon,
        },
        {
            new: true,
        }
    )
    if (!category)
        return res
            .status(400)
            .json({ message: 'operation could not be completed' })
    return res.status(200).send(category)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const category = await Category.findById(id)
    if (!category) {
        return res.status(500).json({
            message:
                'error finding given category , or no such category exists',
        })
    }
    res.status(200).send(category)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    Category.findByIdAndRemove(id)
        .then((response) => {
            if (response) {
                return res.send(200).json({
                    success: true,
                    message: 'Category was deleted successfully',
                })
            }
            return res.status(404).json({
                success: false,
                message: 'Error while deleting the category : operation failed',
            })
        })
        .catch((error) => {
            return res.status(400).json({ success: false, error: error })
        })
})
module.exports = router
