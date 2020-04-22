const mongoose = require('mongoose')
const Schema = mongoose.Schema

var customer = new Schema({
    customerId: { type: String, required: true, index: true},
    email: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cellphone: { type: String, required: true },
    password: { type: String, required: true },
    confirmToken: { type: String, required: true },
    onBoardingDone: { type: Boolean, required: true, default: false },
    avatar: { type: String },
    country: { type: String },
    city: { type: String },
    streetAddress: { type: String },
    apartment: { type: String },
    zipcode: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', customer)