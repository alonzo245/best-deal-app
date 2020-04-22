const express = require('express')
const router = express.Router()

const injects = ({ logger, controller, validator, utils, middlewares }) => {
    const jwt = middlewares.jwt.injects({ logger })
    const ordertCtrl = controller.injects({ logger })
    // const validate = validator.injects({ logger, validateResult: utils.validateResult })

    return router
    .get('/', jwt.auth,  ordertCtrl.getCustomerOrders)
    .post('/checkout', jwt.auth,  ordertCtrl.checkout)
}
module.exports = { injects }