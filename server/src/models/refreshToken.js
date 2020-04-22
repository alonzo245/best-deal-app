const mongoose = require('mongoose')
const Schema = mongoose.Schema

let refreshToken = new Schema({
    customerId: { type: String , index: true, unique: true},
    token: { type: String, require: true }
},
{ timestamps: true })

module.exports = mongoose.model('RefreshToken', refreshToken)