const mongoose = require('mongoose')
const Schema = mongoose.Schema

var hotProduct = new Schema({
    productId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('HotProduct', hotProduct)