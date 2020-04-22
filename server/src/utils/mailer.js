const nodemailer = require('nodemailer')
const sendGrid = require('nodemailer-sendgrid-transport')

module.exports= nodemailer.createTransport(sendGrid({
    auth: {
        api_key: process.env.SEND_GRID_KEY
    }
}))