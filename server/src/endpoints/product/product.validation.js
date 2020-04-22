const { check } = require('express-validator')

const injects = ({ logger, validateResult }) => ({

    /**
     * getProductByName
     */
    getProductByName: [
        check('productName')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage('Product name invalid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * createProduct
     */
    createProduct: [
        check('oldPrice')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('special')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('rating')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('route')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('image')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('name')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('categoryId')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('price')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('description')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * updateProduct
     */
    updateProduct: [
        check('id')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('oldPrice')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('special')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('rating')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('route')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('image')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('name')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('categoryId')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('price')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        check('description')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage(' not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * deleteProduct
     */
    deleteProduct: [
        check('id')
            .not().isEmpty()
            .trim()
            .escape()
            .withMessage('id not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ]

})
module.exports = { injects }