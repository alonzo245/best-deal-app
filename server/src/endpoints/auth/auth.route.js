const express = require('express')
const router = express.Router()

const injects = ({ logger, controller, validator, utils, middlewares }) => {
    const jwt = middlewares.jwt.injects({ logger })
    const authCtrl = controller.injects({ logger, mailer: utils.mailer })
    const validate = validator.injects({ logger, validateResult: utils.validateResult })

    return router
        .post('/sign-in', validate.signIn, authCtrl.signIn)
        .post('/sign-up', validate.signUp, authCtrl.signUp)
        .post('/sign-out', authCtrl.signOut)
        .post('/token', jwt.auth, validate.refreshToken, authCtrl.refreshToken)//validate.refreshToken
        .get('/confirm-account/:confirmToken', validate.confirmAccount, authCtrl.confirmAccount)
        .post('/update-password', jwt.auth, validate.updatePassword, authCtrl.updatePassword)
        
        //for testing in development
        .get('/delete', authCtrl.deleteAll)
}
module.exports = { injects }