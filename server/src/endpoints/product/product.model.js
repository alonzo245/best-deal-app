const mongoose = require('mongoose')
const Schema = mongoose.Schema

var product = new Schema({
    productId: { type: String },
    name: { type: String },
    oldPrice: { type: String },
    special: { type: String },
    rating: { type: String },
    route: { type: String },
    image: { type: String },
    categoryId: { type: String },
    price: { type: String },
    description: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', product)