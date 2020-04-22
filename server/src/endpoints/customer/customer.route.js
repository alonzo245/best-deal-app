const express = require('express')
const router = express.Router()

const injects = ({ logger, controller, validator, utils, middlewares }) => {
    const jwt = middlewares.jwt.injects({ logger })
    const customerCtrl = controller.injects({ logger })
    const validate = validator.injects({ logger, validateResult: utils.validateResult })

    return router
        .post('/upload',  jwt.auth, validate.uploadAvatar, customerCtrl.uploadAvatar)
        .post('/update-info',  jwt.auth, validate.updateInfo, customerCtrl.updateInfo)
}
module.exports = { injects }
