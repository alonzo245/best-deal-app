const express = require('express')
const router = express.Router()

const injects = ({ logger, controller, validator, utils, middlewares }) => {
    const jwt = middlewares.jwt.injects({ logger })
    const cartCtrl = controller.injects({ logger })
    const validate = validator.injects({ logger, validateResult: utils.validateResult })

    return router
        .get('/', jwt.auth, cartCtrl.getCartByCustomerId)
        .post('/', jwt.auth, validate.insertCart, cartCtrl.insertCart)
        .patch('/', jwt.auth, validate.updateCart, cartCtrl.updateCart)
        .delete('/', jwt.auth, cartCtrl.deleteCart)
}
module.exports = { injects }