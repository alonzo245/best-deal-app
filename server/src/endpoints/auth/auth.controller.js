const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../customer/customer.model')
const RefreshToken = require('../../models/refreshToken')

/**
 * generateAccessToken
 */

function generateAccessToken(user) {
    const newToken = jwt.sign(user, process.env.JWT_SECRET_TOKEN, { expiresIn: '10h' })
    return newToken
}

// let refreshTokens = []

const injects = ({ logger, mailer }) => ({
    deleteAll: async (req, res) => {
        if (process.env.NODE_ENV === 'production') return res.status(403).json({})
        await Customer.remove({})
        await RefreshToken.remove({})
        return res.status(200).json({ message: 'success' })
    },
    /**
     * auth update customer details
     */
    updatePassword: async (req, res) => {
        try {
            // search user by email
            const customer = await Customer.findOne({ customerId: req.customerId })
            if (!customer) {
                logger.error(`error #1, cannot find customerId: ${req.customerId}`)
                return res.status(500).json()
            }

            // validate password
            const verifyPassword = await bcrypt.compare(req.body.oldPassword, customer.password)
            if (!customer || !verifyPassword) {
                logger.error(`error #2, verifyPassword: ${verifyPassword} customer.password: ${customer.password}`)
                return res.status(500).json()
            }

            //hash password
            const salt = await bcrypt.genSaltSync(+process.env.PASSWORD_SALT);
            const hashedPassword = await bcrypt.hash(req.body.newPassword.trim(), salt)
            if (!hashedPassword) {
                logger.error(`error #3, cant hashedPassword ${hashedPassword}`)
                return res.status(500).json()
            }

            //update password in customer
            const updateCustomer = await Customer.findOneAndUpdate(
                { customerId: customer.customerId }, {
                "$set": { password: hashedPassword }
            })

            if (!updateCustomer) {
                logger.error(`error #4, updateCustomer falied ${updateCustomer}`)
                return res.status(500).json()
            }

            res.status(200).json({ message: 'success' })
        } catch (err) {
            console.log(err)
            throw Error('error #5 updatePassword somthing went wrong')
        }

    },


    /**
     * auth signIn
     */

    signUp: async (req, res) => {
        try {
            // check if user exist
            const customerExist = await Customer.findOne({ email: req.body.email })
            if (customerExist !== null) return res.status(401).json({})
            console.log('customerExist', customerExist)

            // count users
            const count = await Customer.countDocuments()
            console.log('count', count)

            //hash password
            console.log('process.env.PASSWORD_SALT', +process.env.PASSWORD_SALT)
            const salt = await bcrypt.genSaltSync(+process.env.PASSWORD_SALT);
            const hashedPawword = await bcrypt.hash(req.body.password, salt)
            if (!hashedPawword) return res.status(401).json({})

            //register user
            const confirmToken = uuid.v1()
            const customer = new Customer({
                email: req.body.email,
                cellphone: req.body.cellphone,
                customerId: (count + 1),
                password: hashedPawword,
                fullName: `${req.body.firstName.trim()} ${req.body.lastName.trim()}`,
                firstName: req.body.firstName.trim(),
                lastName: req.body.lastName.trim(),
                confirmToken
            })
            const createdCustomer = await customer.save()
            if (!createdCustomer) return res.status(401).json({})
            console.log('createdCustomer', createdCustomer)

            //generate token
            const accessToken = generateAccessToken({ customerId: createdCustomer.customerId })
            const refreshToken = jwt.sign({ customerId: createdCustomer.customerId }, process.env.JWT_REFRESH_TOKEN)
            if (!refreshToken) return res.status(401).json({})

            // refreshTokens.push(refreshToken)
            const rt = new RefreshToken({ customerId: createdCustomer.customerId, token: refreshToken })
            const savedToken = await rt.save()
            if (!savedToken) return res.status(401).json({})

            //send email to confirm registration
            const htmlMsg = `<h1> Hi ${req.body.firstName.trim()} ${req.body.lastName.trim()}</h1>
        <br/><br/>
        <p>Confirm your account using the link below.</p>
        <a href="${process.env.WEBSITE_HOST}/confirm-account/${confirmToken}">confirm account</a>`

            console.log(`${process.env.WEBSITE_HOST}/confirm-account/${confirmToken}`)
            console.log(htmlMsg)

            if (process.env.NODE_ENV === 'production') {
                mailer.sendMail({
                    to: req.body.email.trim(),
                    from: 'service@shoppingstoretutorial.com',
                    subject: 'Thank you for signing up - Please Confirm your account',
                    html: htmlMsg

                })
            }

            res.status(200).json({
                customerId: customer.customerId,
                onBoarding: customer.onBoardingDone,
                fullName: customer.fullName,
                email: customer.email,
                cellphone: customer.cellphone,
                country: customer.country || '',
                city: customer.city || '',
                streetAddress: customer.streetAddress || '',
                apartment: customer.apartment || '',
                zipcode: customer.zipcode || '',
                avatar: customer.avatar || '',
                accessToken,
                refreshToken
            })
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * refresh token
     */
    refreshToken: async (req, res) => {
        try {
            const refreshTokenInput = req.body.token
            if (refreshTokenInput == null) return res.status(403).json({})

            const rt = await RefreshToken.findOne({ customerId: req.customerId })

            jwt.verify(refreshTokenInput, process.env.JWT_REFRESH_TOKEN, (err, customerId) => {
                if (err) return res.status(403).json({})
                const accessToken = generateAccessToken({ customerId: req.customerId })
                res.status(200).json({ accessToken })
            })
        } catch (error) {
            console.log(req.body.token)

        }
    },

    /**
     * GET confirm Account
    */

    confirmAccount: async (req, res) => {

        //find token
        const customer = await Customer.findOne({ confirmToken: req.params.confirmToken })
        if (!customer) return res.status(401).json({ status: 'fail', message: 'somthing went wrong1' })

        if (customer.onBoardingDone === true) {
            return res.status(401).json({ status: 'fail', message: 'confirmed' })
        }

        //compare confirm token
        console.log(req.params.confirmToken, customer.confirmToken)
        if (req.params.confirmToken !== customer.confirmToken) {
            return res.status(401).json({ status: 'fail', message: 'somthing went wrong2' })
        }

        const updateCustomerToken = await Customer.findOneAndUpdate(
            { customerId: customer.customerId },
            {
                "$set": { onBoardingDone: true }
            })
        console.log('updateCustomerToken----------------------', updateCustomerToken)
        if (!updateCustomerToken) return res.status(401).json({ status: 'fail', message: 'somthing went wrong3' })

        res.status(200).json({ status: 'success' })
    },

    /**
     * auth signIn
     */
    signIn: async (req, res) => {
        try {

            // search user by email
            const customer = await Customer.findOne({ email: req.body.email })
            if (!customer) return res.sendStatus(401)

            // validate password
            console.log('req.body.password, customer ----------', req.body.password, customer.password)
            const verifyPassword = await bcrypt.compare(req.body.password, customer.password)
            console.log('verifyPassword', verifyPassword)
            if (!customer || !verifyPassword) return res.status(401).json({ errors: { msg: 'somthing went wrong...' } })

            // check if user confirm email token
            if (customer.confirmToken !== true) {
                console.log('user didnt confirm email token **********************************')
                // return res.status(205).json({ status: 'fail', message: 'confirm email required' })
            }

            console.log('user', customer)
            const accessToken = generateAccessToken({ customerId: customer.customerId })
            const refreshToken = jwt.sign({ customerId: customer.customerId }, process.env.JWT_REFRESH_TOKEN)
            const refreshTokenUpdate = await RefreshToken.update({ customerId: `${customer.customerId}` },
                {
                    $setOnInsert: {
                        customerId: `${customer.customerId}`, token: refreshToken
                    }
                }, { upsert: true })

            // console.log(accessToken)
            res.status(200).json({
                status: 'success',
                onBoarding: customer.onBoardingDone,
                customerId: customer.customerId,
                fullName: customer.fullName,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                cellphone: customer.cellphone,
                country: customer.country || '',
                city: customer.city || '',
                streetAddress: customer.streetAddress || '',
                apartment: customer.apartment || '',
                zipcode: customer.zipcode || '',
                avatar: customer.avatar || '',
                accessToken,
                refreshToken
            })
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * POST sign out
    */

    signOut: async (req, res) => {
        try {
            // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!', req.body.customerId)
            // console.log('refreshTokens', refreshTokens)
            await RefreshToken.deleteOne({ customerId: req.body.customerId })
            res.status(204).json({ message: 'signed out' })

        } catch (error) {
            console.log(error)
        }
    },


})

module.exports = { injects }