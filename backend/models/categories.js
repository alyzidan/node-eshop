const mongoose = require('mongoose')
const singleCategory = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    },
    image: String,
})
exports.Category = mongoose.model('Categories', singleCategory)
