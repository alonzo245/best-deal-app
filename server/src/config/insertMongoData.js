// require('dotenv').config()
const mongoose = require('mongoose')
const categories = require('./categories.json')
const Category = require('../endpoints/category/category.model')

const products = require('./products.json')
const Product = require('../endpoints/product/product.model')

const hotproducts = require('./hotproducts.json')
const HotProduct = require('../models/hotProduct.model')

const sliderproducts = require('./sliderproducts.json')
const SliderProduct = require('../models/sliderProduct.model')


const injects = (mongooseClient) => ({
    initDbData: () => {
        return Promise.all([
            Product.find({}),
            Category.find({}),
            HotProduct.find({}),
            SliderProduct.find({})
        ])
            .then(([product, category, hotProduct, sliderProduct]) => {
                let promises = []
                if (product.length === 0)
                    promises.push(Product.insertMany(products))
                if (category.length === 0)
                    promises.push(Category.insertMany(categories))
                if (hotProduct.length === 0)
                    promises.push(HotProduct.insertMany(hotproducts))
                if (sliderProduct.length === 0)
                    promises.push(SliderProduct.insertMany(sliderproducts))
                return Promise.all(promises)
            })
            .then(result => {
                console.log('DATA IMPORT WAS A SUCCESS!!!!!!!!!!!!!!!!', result)
                return Promise.resolve()
            })
            .catch(err => {
                console.log(err)
            });
    }
})

module.exports = { injects }