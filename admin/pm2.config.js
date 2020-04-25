module.exports = [
    {
        script: 'src/server.js',
        name: 'api',
        exec_mode: 'cluster',
        instances: 1
    }
]