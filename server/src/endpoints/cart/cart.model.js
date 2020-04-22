const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cart = new Schema({
    customerId: {
        // type: Schema.Types.ObjectId,
        // ref: 'Customer',
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Cart', cart)