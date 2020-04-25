const logger = require('./utils/logger').init()
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
// const swaggerUi = require("swagger-ui-express")
const morganBody = require('morgan-body')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const compression = require('compression')
// const fs = require('fs')
// const https = require('https')


// for testing development
const testData = require('./config/insertMongoData')

// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',process.env)
logger.info('init API...')

/**
 * handle system errors
 */
process.on('unhandledRejection', (reason, promise) => {
    logger.info(reason);
    console.log(reason);
})

process.on('uncaughtException', (err) => {
    logger.debug(err);
    console.log(err);
})

/**
 * import routes 
 */
const config = require("./index")


/**
 * middlewares
 */
const app = express()

// const privateKey = fs.readFileSync(path.join(__dirname, '..', 'server.key'))
// const certificate = fs.readFileSync(path.join(__dirname, '..', 'server.cert'))


app.use(helmet())
app.use(compression())

/**
 * log http traffic
 */
morganBody(app, {
    theme: 'usa'
})
morgan.token('body', function (req, res) {
    return req.body
})
app.use(morgan('combined'))
app.use(morgan(':method *** :url *** :status'))


/**
 * for customers uploads
 */
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(fileUpload())

/**
 * generate unauthenticated routes
 **/
const API_VERSION = '/api-v1'
config.endpoints.forEach(({ name, route }) => {
    logger.info(`${API_VERSION}/${name}/`)

    // add or remove base api url
    let baseApiUrl = ['auth'].includes(name) ? '' : API_VERSION
    // console.log('$$$$$$$$$$$$$$$$$$qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq$$$$$$$$$$$$$$$$$$$$$$', config.utils)
    app.use(`${baseApiUrl}/${name}/`, route.injects({
        logger,
        controller: config.controllers[name],
        validator: config.validators[name],
        utils: config.utils,
        middlewares: config.middlewares
    }))

})

// error handler 
app.use((errors, req, res, next) => {
    const status = errors.statusCode || 500;
    logger.error(errors)
    res.status(status)
});

/**
 * init db connection
 */
console.log('###############################################', process.env.MONGO_URI)
module.exports = mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // user: 'root',
    // pass: 'example',
    // keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false 
})
    .then(connection => {
        // for development 
        return testData.injects(connection).initDbData()

    })
    .then(() => app)

    .catch(err => {
        console.log('err', err)
    })
