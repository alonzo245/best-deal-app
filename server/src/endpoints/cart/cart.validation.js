const { check, body } = require('express-validator')

const injects = ({ logger, validateResult }) => ({

    /**
     * insertCart
     */
    insertCart: [
        body('cart')
            // .not().isEmpty()
            .isArray()
            .withMessage('cart not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * updateCart
     */
    updateCart: [
        body('cart')
            // .not().isEmpty()
            .isArray()
            .withMessage('cart not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ]

})
module.exports = { injects }