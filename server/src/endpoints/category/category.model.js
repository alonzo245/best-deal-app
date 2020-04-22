const mongoose = require('mongoose')
const Schema = mongoose.Schema

var category = new Schema({
    categoryId: {
        type: String,
        required: true
    }, 
    icon: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Category', category)