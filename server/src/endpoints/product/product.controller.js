const express = require('express')
const Product = require('./product.model');
const SliderProduct = require('../../models/sliderProduct.model');
const HotProduct = require('../../models/hotProduct.model');
const fileds = [
    'price',
    'oldPrice',
    'special',
    'rating',
    'route',
    'image',
    'name',
    'categoryId',
    'price',
    'description',
]


const injects = ({logger}) => ({
    /**
     * get Hot Products
     */
    getHotProducts: async (req, res, next) => {
        try {
            const hotProducts = await HotProduct.find({})
            if (!hotProducts) return res.status(401).json({ statuse: 'fail', message: 'somthing went wrong' })

            const products = await Promise.all(hotProducts
                .map(async product => await Product.findOne({ productId: `${product.productId}` })))

            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%products', hotProducts)
            res.status(200).json([...products])
        } catch (err) {
            console.log(err)
        }
    },

    /**
    * get Slider Products
    */
    getSliderProducts: async (req, res, next) => {
        try {
            const sliderProducts = await SliderProduct.find({})//.select()
            if (!sliderProducts) return res.status(401).json({ statuse: 'fail', message: 'somthing went wrong' })

            const products = await Promise.all(sliderProducts
                .map(async product => await Product.findOne({ productId: `${product.productId}` })))

            console.log('products', products)
            res.status(200).json([...products])
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * get all products
     */
    getProducts: (req, res, next) => {
        Product.find()
            .then(products => {
                // console.log(products)
                res.status(200).json({ products })
            })
            .catch(err => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            });
    },

    /**
     * get product by id
     */
    getProductByName: (req, res, next) => {
        Product.findOne({ route: req.params.productName })
            .then(product => {
                // console.log(products)
                res.status(200).json({ ...product._doc })
            })
            .catch(err => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            });
    },

    /**
     * get product by id
     */
    getProductsByCategory: async (req, res, next) => {
        try {
            console.log(req.query)
            const categoryId = +req.query.categoryId || 1
            const items = +req.query.items || 5
            const page = +req.query.page - 1 || 0
            const products = await Product
                .find({ categoryId })
                .skip(page * items)
                .limit(items)


            if (!products) return res.status(200).json({ massage: 'somthing went wrong...' })
            // console.log('products', products)

            const hasMore = await Product
                .find({ categoryId })
                .skip((page + 1) * items)
                .limit(items)
                .countDocuments()


            if (!products) return res.status(200).json({ massage: 'somthing went wrong...' })
            console.log('hasMore', hasMore)


            res.status(200).json({
                hasMore: hasMore ? true : false,
                products
            })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    },

    /**
     * create product
     */
    createProduct: async (req, res, next) => {
        try {
            const product = new Product({ ...req.body })
            const result = await product.save()

            if (!result) return res.status(200).json({ massage: 'somthing went wrong...' })

            res.status(200).json({ massage: 'product created' })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    },

    /**
     * update product
     */
    updateProduct: async (req, res, next) => {
        try {
            let fieldsForUpdate = {}
            fileds.forEach(field => {
                if (req.body[field] || req.body[field] === '' || req.body[field] === 0) {
                    // console.log(req.body)
                    fieldsForUpdate[field] = req.body[field]
                }
            })
            const result = await Product.updateOne({ _id: req.params.id },
                { $set: { ...fieldsForUpdate } })

            if (!result) return res.status(200).json({ massage: 'no match product' })

            res.status(200).json({ massage: 'product updated' })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    },

    /**
     * delete product
     */
    deleteProduct: async (req, res, next) => {
        try {
            const result = await Product.deleteOne({ _id: req.params.id })

            if (!result) return res.status(200).json({ massage: 'no match product' })``

            res.status(200).json({ massage: 'product removed' })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    }

})

module.exports = { injects }