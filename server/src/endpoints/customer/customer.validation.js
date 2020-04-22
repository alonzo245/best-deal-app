const { check } = require('express-validator')

const injects = ({ logger, validateResult }) => ({

    /**
     * upload
     */
    uploadAvatar: [
        (req, res, next) => {
            if (
                req.files.file.mimetype === 'image/PNG' ||
                req.files.file.mimetype === 'image/png' ||
                req.files.file.mimetype === 'image/jpg' ||
                req.files.file.mimetype === 'image/jpeg'
            ) {
                next()
            } else {
                res.status(400)
            }
        }
    ],

    /**
     * createCategory
     */
    updateInfo: [
        check('country')
            .optional()
            .isString()
            .isAlpha()
            .escape()
            .trim()
            .withMessage('input invalid'),
        check('city')
            .optional()
            .isString()
            .isAlpha()
            .escape()
            .trim()
            .withMessage('input invalid'),
        check('streetAddress')
            .optional()
            .escape()
            .trim(),
        check('apartment')
            .optional()
            .escape()
            .trim(),
        check('zipcode')
            .isNumeric()
            .escape()
            .trim()
            .withMessage('input invalid'),
        (req, res, next) => validateResult(req, res, next, logger)
    ]

})
module.exports = { injects }