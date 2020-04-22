const express = require('express')
const router = express.Router()

const injects = ({ logger, controller, validator, utils, middlewares }) => {
    const productCtrl = controller.injects({ logger })
    const validate = validator.injects({ logger, validateResult: utils.validateResult })

    return router
    .get('/', productCtrl.getProducts)
    .get('/slider', productCtrl.getSliderProducts)
    .get('/hot', productCtrl.getHotProducts)
    .get('/by-category', productCtrl.getProductsByCategory)
    .get('/:productName', validate.getProductByName, productCtrl.getProductByName)
    .post('/', validate.createProduct, productCtrl.createProduct)
    .patch('/:id', validate.updateProduct, productCtrl.updateProduct)
    .delete('/:id', validate.deleteProduct, productCtrl.deleteProduct)
}
module.exports = { injects }