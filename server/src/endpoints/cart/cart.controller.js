const Customer = require('../customer/customer.model');
const Cart = require('./cart.model');
const fileds = []

const injects = ({logger}) => ({
    /**
     * get cart by customer id
     */
    getCartByCustomerId: async (req, res, next) => {
        // console.log('555', req.customerId)
        try {
            const cart = Cart.findOne({ customerId: req.customerId })
            console.log('******************************************', req.customerId)
            console.log('******************************************', req.customerId)
            console.log('******************************************', req.customerId)
            return res.status(200).json({ cart: (!cart._doc ? [] : [...cart._doc.cart]) })
        } catch (err) {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },


    /**
     * save cart
     */
    insertCart: async (req, res, next) => {
        try {
            //find customer
            const customer = await Customer.findOne({ customerId: req.customerId })
            if (!customer) return res.status(200).json({ massage: 'somthing went wrong...' })

            //find if cart exsit
            const cartExist = await Cart.findOne({ customerId: req.customerId })
            if (cartExist) return res.status(200).json({ massage: 'cart exist...' })


            console.log('customer._id', customer._id, req.body.cart)
            // create cart
            const cart = new Cart({ cart: [...req.body.cart], customerId: req.customerId })
            cart.save()
            console.log(cart)
            if (!cart) return res.status(200).json({ massage: 'somthing went wrong...' })

            res.status(200).json({ massage: 'cart created' })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    },

    /**
     * create cart
     */
    updateCart: async (req, res, next) => {
        try {
            console.log('user', req.customerId)
            const customer = await Customer.findOne({ customerId: req.customerId })
            if (!customer) return res.status(200).json({ massage: 'somthing went wrong...' })

            console.log('customer._id', customer._id, req.body.cart)
            // update cart
            const cart = await Cart.updateOne({ customerId: req.customerId },
                { $set: { cart: [...req.body.cart] } })

            console.log(cart)
            if (!cart) return res.status(200).json({ massage: 'somthing went wrong...' })


            res.status(200).json({ massage: 'cart created' })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    },

    /**
     * delete cart
     */
    deleteCart: async (req, res, next) => {
        try {
            const result = await Cart.updateOne({ _id: req.params.id },
                { $set: { cart: [] } })


            if (!result) return res.status(200).json({ massage: 'no match cart' })

            res.status(200).json({ massage: 'cart removed' })
        } catch (err) {
            console.log(err)
            if (!err.statusCode) err.statusCode = 500;
            next(err)
        }
    }

})

module.exports = { injects }