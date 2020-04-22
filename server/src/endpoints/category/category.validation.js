const { check } = require('express-validator')

const injects = ({ logger, validateResult }) => ({

    /**
     * createCategory
     */
    createCategory: [
        check('email')
            .not().isEmpty()
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .withMessage('Email not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * updateCategory
     */
    updateCategory: [
        check('email')
            .not().isEmpty()
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .withMessage('Email not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * deleteCategory
     */
    deleteCategory: [
        check('email')
            .not().isEmpty()
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .withMessage('Email not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

})
module.exports = { injects }