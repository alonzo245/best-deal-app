const mongoose = require('mongoose')
const Product = require('../product/product.model')
const Schema = mongoose.Schema

var order = new Schema({
    customerId: { type: String, required: true },
    billing: {
        totalBeforeTax: { type: String, required: true },
        tax: { type: String, required: true },
        total: { type: String, required: true },
    },
    shipping: {
        email: { type: String, required: true, },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        cellphone: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        streetAddress: { type: String, required: true },
        apartment: { type: String, required: true },
        zipcode: { type: String, required: true },
    },
    products: [{
        route: { type: String },
        name: { type: String },
        productId: { type: String },
        categoryId: { type: String },
        image: { type: String },
        price: { type: String },
        description: { type: String },
        quantity: { type: String }
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', order)