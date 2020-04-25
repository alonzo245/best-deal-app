const { check } = require('express-validator')

const injects = ({ logger, validateResult }) => ({

    /**
     * createCategory
     */
    createCategory: [
        check('active')
            .trim()
            .escape()
            .isString()
            .not().isEmpty()
            .withMessage('Category active field not valid'),
        check('icon')
            .trim()
            .escape()
            .not().isEmpty()
            .isString()
            .withMessage('Category icon field not valid'),
        check('name')
            .trim()
            .escape()
            .isString()
            .withMessage('Category name field not valid'),
        check('route')
            .trim()
            .escape()
            .not().isEmpty()
            .isString()
            .withMessage('Category route field not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * updateCategory
     */
    updateCategory: [
        check('active')
            .trim()
            .escape()
            .isString()
            .withMessage('Category active field not valid'),
        check('icon')
            .trim()
            .escape()
            .not().isEmpty()
            .isString()
            .withMessage('Category icon field not valid'),
        check('name')
            .trim()
            .escape()
            .not().isEmpty()
            .isString()
            .withMessage('Category name field not valid'),
        check('route')
            .trim()
            .escape()
            .not().isEmpty()
            .isString()
            .withMessage('Category route field not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * deleteCategory
     */
    deleteCategory: [
        check('id')
            .trim()
            .escape()
            .not().isEmpty()
            .isString()
            .withMessage('id not valid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

})
module.exports = { injects }