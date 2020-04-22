const { check } = require('express-validator')

const injects = ({ logger, validateResult }) => ({

    /**
     * signIn
     */
    signIn: [
        check('email')
            .not().isEmpty()
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .withMessage('Email not valid'),
        check('password')
            .not().isEmpty()
            .isString()
            .escape()
            .isLength({ min: 6, max: 20 })
            .trim()
            .withMessage('Password must be between 6 to 20 characters'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * signUp
     */
    signUp: [
        check('email')
            .not().isEmpty()
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .withMessage('Email not valid'),
        check('confirmEmail')
            .not().isEmpty()
            .isEmail()
            .trim()
            .escape()
            .normalizeEmail()
            .custom((value, { req }) => {
                if (value !== req.body.email) {
                    throw new Error(`Emails don't match`);
                }

                return true;
            })
            .withMessage('Email not valid'),
        check('cellphone')
            .not().isEmpty()
            .isNumeric()
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number isnt correct'),
        check('firstName')
            .not().isEmpty()
            .isString()
            .isAlpha()
            .escape()
            .trim()
            .withMessage('Name cannot be empty'),
        check('lastName')
            .not().isEmpty()
            .isString()
            .isAlpha()
            .escape()
            .trim()
            .withMessage('Last name must be alphabet characters'),
        check('password')
            .not().isEmpty()
            .isString()
            .escape()
            .isLength({ min: 6, max: 20 })
            .trim()
            .withMessage('Password must be between 6 to 20 characters'),
        check('confirmPassword')
            .not().isEmpty()
            .isString()
            .escape()
            .isLength({ min: 6, max: 20 })
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(`Password don't match`);
                }

                return true;
            })
            .withMessage('Confirm password not matches'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * updatePassword
     */
    updatePassword: [
        check('oldPassword')
            .not().isEmpty()
            .isString()
            .escape()
            .isLength({ min: 6, max: 20 })
            .trim()
            .withMessage('Password must be between 6 to 20 characters'),
        check('newPassword')
            .not().isEmpty()
            .isString()
            .escape()
            .isLength({ min: 6, max: 20 })
            .trim()
            .withMessage('Password must be between 6 to 20 characters'),
        check('confirmNewPassword')
            .not().isEmpty()
            .isString()
            .escape()
            .isLength({ min: 6, max: 20 })
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error(`Password don't match`);
                }

                return true;
            })
            .withMessage('Confirm password not matches'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * confirmAccount
     */
    confirmAccount: [
        check('confirmToken')
            .not().isEmpty()
            .isString()
            .trim()
            .withMessage('token is empty'),
        (req, res, next) => validateResult(req, res, next, logger)
    ],

    /**
     * refreshToken
     */
    refreshToken: [
        check('token')
            .not().isEmpty()
            .isString()
            .trim()
            .withMessage('token is empty'),
        (req, res, next) => validateResult(req, res, next, logger)
    ]

})
module.exports = { injects }