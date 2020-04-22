const Order = require('./order.model')
const Customer = require('../customer/customer.model')
const injects = ({ logger }) => ({

    /**
     * getCustomerOrders
     */
    getCustomerOrders: async (req, res, next) => {
        try {
            const orders = await Order.find({ customerId: `${req.customerId}` })
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', req.customerId)
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            console.log(orders)
            let formattedOrdes = orders.map(order => {
                return { ...order._doc, orderId: order._doc._id }
            })
            return res.status(200).json(formattedOrdes)
        } catch (error) {
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', error)

            if (!error.statusCode) error.statusCode = 500;
            next(error);
        }
    },
    /**
     * delete product
     */
    checkout: async (req, res, next) => {
        // logger.info(req.body.cart)
        // logger.info(req.body.paymentDetails)
        // logger.info(req.customerId)

        try {
            const customer = await Customer.findOne({ customerId: req.customerId })
            if (!customer) {
                logger.error(`error #1, cannot find customerId: ${req.customerId}`)
                return res.status(400).json({})
            }

            //calc products sum
            const totalBill = req.body.cart.reduce((result, product) => {
                return result + product.price * product.quantity
            }, 0)

            // ceck if cart is empty
            if (req.body.cart.length === 0 || !req.body.cart) {
                return res.status(400).json({})
            }

            // check if shipping details not empty
            const shippingDetails = [
                customer.email,
                customer.firstName,
                customer.lastName,
                customer.cellphone,
                customer.country,
                customer.city,
                customer.streetAddress,
                customer.apartment,
                customer.zipcode,
            ]

            const validateShippingDetails = shippingDetails.every(field => field)
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',validateShippingDetails)
            if(!validateShippingDetails){
                return res.status(400).json({asdsad:"asd"})
            }

            const newOrder = {
                customerId: customer.customerId,
                billing: {
                    totalBeforeTax: totalBill,
                    tax: '17',
                    total: (totalBill * 0.17) + totalBill,
                },
                shipping: {
                    email: customer.email,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    cellphone: customer.cellphone,
                    country: customer.country,
                    city: customer.city,
                    streetAddress: customer.streetAddress,
                    apartment: customer.apartment,
                    zipcode: customer.zipcode,
                },
                products: [...req.body.cart]
            }
            const order = new Order(newOrder)
            const result = await order.save()
            res.status(200).json({ msg: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({})
        }
    }
})

module.exports = { injects }