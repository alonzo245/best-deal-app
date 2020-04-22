/**
 * init env varibles
 */
require('dotenv').config()
const config = require("./app")


// console.log(app)

config.then(app => {
    //spin the server
    const port = parseInt(process.env.API_PORT)

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})


