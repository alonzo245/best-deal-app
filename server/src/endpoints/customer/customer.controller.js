const path = require('path')
const Customer = require('./customer.model');

const injects = ({ logger }) => ({
    /**
     * upload avatar
     */
    uploadAvatar: async (req, res) => {
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const file = req.files.file;
        console.log('customerId', req.customerId)
        const fileType = file.mimetype.split('/')[1]

        const filename = `${file.name.split('.')[0]}_${req.customerId}_${new Date().getTime()}.${fileType}`
        file.mv(`${path.join(__dirname, '..', '..', '..', 'public', 'uploads', filename)}`, async err => {
            if (err) {
                console.error(err)
                return res.status(500).send(err)
            }

            //update avatar in customer info
            const cdn = ''
            const customer = await Customer.findOne({ customerId: req.customerId })
            if (!customer) return res.status(200).json({ message: 'somthing went wrong' })

            console.log(customer)
            const updateCustomer = await Customer.findOneAndUpdate(
                { customerId: req.customerId }, { "$set": { avatar: filename } })


            console.log('avatar', updateCustomer)
            if (!updateCustomer) return res.status(200).json({ message: 'somthing went wrong' })


            res.json({ status: 'success', avatar: `${cdn}${filename}` })
        })

    },

    /**
     * auth update customer details
     */
    updateInfo: async (req, res) => {
        try {
            const customer = await Customer.findOne({ customerId: req.customerId })
            if (!customer) return res.status(200).json({ message: 'somthing went wrong' })

            console.log(customer)
            const updateCustomer = await Customer.findOneAndUpdate(
                { customerId: req.customerId },
                {
                    "$set": {
                        // fullName: !req.body.fullName ? customer.fullName : req.body.fullName,
                        // firstName: !req.body.firstName ? customer.firstName : req.body.firstName,
                        // lastName: !req.body.lastName ? customer.lastName : req.body.lastName,
                        // cellphone: !req.body.cellphone ? customer.cellphone : req.body.cellphone,
                        country: !req.body.country ? customer.country : req.body.country,
                        city: !req.body.city ? customer.city : req.body.city,
                        streetAddress: !req.body.streetAddress ? customer.streetAddress : req.body.streetAddress,
                        apartment: !req.body.apartment ? customer.apartment : req.body.apartment,
                        zipcode: !req.body.zipcode ? customer.zipcode : req.body.zipcode
                    }
                })


            console.log('update customer', updateCustomer)
            if (!updateCustomer) return res.status(200).json({ message: 'somthing went wrong' })

            const refreshCustomer = await Customer.findOne({ customerId: req.customerId })
            if (!refreshCustomer) return res.status(200).json({ message: 'somthing went wrong' })

            res.status(200).json({
                status: 'success',
                customer: {
                    // fullName: refreshCustomer.fullName,
                    // email: refreshCustomer.email,
                    // cellphone: refreshCustomer.cellphone,
                    country: refreshCustomer.country,
                    city: refreshCustomer.city,
                    streetAddress: refreshCustomer.streetAddress,
                    apartment: refreshCustomer.apartment,
                    zipcode: refreshCustomer.zipcode,
                    avatar: refreshCustomer.avatar,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
})

module.exports = { injects }