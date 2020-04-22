module.exports = {
    endpoints: [{
            name: 'auth',
            route: require('./endpoints/auth/auth.route')
        },
        {
            name: 'cart',
            route: require('./endpoints/cart/cart.route')
        },
        {
            name: 'category',
            route: require('./endpoints/category/category.route')
        },
        {
            name: 'customer',
            route: require('./endpoints/customer/customer.route')
        },
        {
            name: 'product',
            route: require('./endpoints/product/product.route')
        },
        {
            name: 'order',
            route: require('./endpoints/order/order.route')
        }
    ],
    controllers: {
        auth: require('./endpoints/auth/auth.controller'),
        cart: require('./endpoints/cart/cart.controller'),
        category: require('./endpoints/category/category.controller'),
        customer: require('./endpoints/customer/customer.controller'),
        product: require('./endpoints/product/product.controller'),
        order: require('./endpoints/order/order.controller')
    },
    validators: {
        auth: require('./endpoints/auth/auth.validation'),
        cart: require('./endpoints/cart/cart.validation'),
        category: require('./endpoints/category/category.validation'),
        customer: require('./endpoints/customer/customer.validation'),
        product: require('./endpoints/product/product.validation')
    },
    utils: {
        validateResult: require('./utils/validate-result'),
        mailer: require('./utils/mailer'),
        cache: require('./utils/redis-client') 
    },
    middlewares: {
        jwt: require('./middleware/jwt')
    }
}
