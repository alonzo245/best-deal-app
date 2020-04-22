const jwt = require('jsonwebtoken')

// const refreshToken = (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.sendStatus(401)
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

//     jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, customerId) => {
//         console.log('@@@@@@@@@@@@@@@@@@@@', customerId)
//         if (err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ customerId: req.customerId })
//         res.json({ accessToken })
//     })
// },
// console.log('*****************************************************', process.env.JWT_REFRESH_TOKEN)
// console.log('*****************************************************')
// console.log('*****************************************************')
// console.log('*****************************************************')
// console.log('*****************************************************')
// console.log('*****************************************************')
const injects = ({ logger }) => ({
    auth: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ token: 'unauthorized' })

        // try to authenticate
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, customerId) => {

            // try to refresh token if theres an error
            if (err || !customerId) {
                // check for refresh token in db for user
                jwt.verify(req.refreshToken, process.env.JWT_REFRESH_TOKEN, (err, customerId) => {
console.log('*****************************************************', customerId)
console.log('*****************************************************')
console.log('*****************************************************')
console.log('*****************************************************')
console.log('*****************************************************')
console.log('*****************************************************', req.refreshToken)
                    if (err || !customerId) {
                        console.log(`error #6 jwt error ${err}`)
                        res.status(401).json({ msg: 'session expired' })
                        return
                    }

                    // if succeeded generate new token
                    const accessToken = jwt.sign(user, process.env.JWT_SECRET_TOKEN, { expiresIn: '10s' })
                    req.customerId = customerId.customerId
                })
            }

            // if jwt not expired continue
            req.customerId = customerId.customerId
            next()
        })
    }

})

module.exports = { injects }