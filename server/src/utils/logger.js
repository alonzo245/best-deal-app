const winston = require('winston')
// const {createLogger,format,transpotrs,excetionHandlers} = require('winston')
// const {combine,timestamp,label,prettyPrint} = format;
const wdrf = require('winston-daily-rotate-file')
const fs = require('fs');
const path = require('path')

// let c = 0
// while (c < 2) {
//     c += 1;
//     logger.error('logggggg this ' + c)
//     logger.info('logggggg this ' + c)
//     logger.debug('logggggg this ' + c)
//     logger.warn('logggggg this ' + c)
//     logger.http('logggggg this ' + c)
//     logger.debug('logggggg this ' + c)
//     logger.silly('logggggg this ' + c)
// }

const logLevels = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7
    },
    colors: {
        emerg: 'red',
        alert: 'red',
        crit: 'red',
        error: 'red',
        warning: 'yellow',
        notice: 'blue',
        info: 'pink',
        debug: 'pink'
    }
}


const init = (settings = {}) => {
    try {
        //create dir if not exist
        const dir = path.join(__dirname, '..', '..', 'logs')
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, err => console.log(err))
        }


        const myFormat = winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        });

        winston.addColors(logLevels)

        const logger = new winston.createLogger({
            level: "debug",
            format: winston.format.combine(winston.format.timestamp(), myFormat),  // winston.format.json(),        
            transports: [
                new winston.transports.File({ filename: path.join(dir, 'error.log'), level: 'error' }),
                new winston.transports.File({ filename: path.join(dir, 'combined.log') }),
            ],
            exceptionHandlers: [
                new winston.transports.File({ filename: path.join(dir, 'exceptions.log') }),
                new winston.transports.File({ filename: path.join(dir, 'combined.log') })
            ],
            exitOnError: false,
            // handleExceptions: true
        })


        logger.add(new (wdrf)({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss A ZZ'
                }),
                winston.format.label({ label: '' }),
                winston.format.json()
            ),
            filename: path.join(dir, 'shopping-store-%DATE%.log'),
            label: settings.label || 'shopping-store-label',
            level: settings.level || 'info',
            datePattern: 'YYYY-MM-DD-HH',
            timestamp: (new Date()).toLocaleTimeString(),
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '30d',

        }))

        // console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'development') {
            logger.add(new (winston.transports.Console)({
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD hh:mm:ss A ZZ'
                    }),
                    winston.format.label({ label: '' }),
                    winston.format.json(),
                    // winston.format.align(),
                ),
                timestamp: true,
                level: 'debug',
                colorize: true,
                json: false,

            }))
        }
        return logger
    } catch (error) {
        console.log(error)
    }
}

module.exports = { init }