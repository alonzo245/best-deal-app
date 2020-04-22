const { validationResult } = require('express-validator')

module.exports = (req, res, next, logger) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(JSON.stringify({ errors: errors.array() }))
        return res.status(400).json({});
    }
    next()
}
