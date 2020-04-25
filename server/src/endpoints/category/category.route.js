const express = require('express')
const router = express.Router()

const injects = ({ logger, controller, validator, utils, middlewares }) => {
    const categoryCtrl = controller.injects({ logger, cache: utils.cache})
    const validate = validator.injects({ logger, validateResult: utils.validateResult })

    return router
        .get('/', categoryCtrl.getCategories)
        .post('/', validate.createCategory, categoryCtrl.createCategory)
        .patch('/', validate.updateCategory, categoryCtrl.updateCategory)
        // .delete('/', validate.deleteCategory, categoryCtrl.deleteCategory)
}
module.exports = { injects }