const mongoose = require('mongoose')
const Schema = mongoose.Schema

var sliderProduct = new Schema({
    productId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('SliderProduct', sliderProduct)