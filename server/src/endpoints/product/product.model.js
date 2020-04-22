const mongoose = require('mongoose')
const Schema = mongoose.Schema

var product = new Schema({
    oldPrice: { type: String },
    special: { type: String },
    rating: { type: String },
    route: { type: String },
    image: { type: String },
    name: { type: String },
    productId: { type: String },
    categoryId: { type: String },
    price: { type: String },
    description: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', product)