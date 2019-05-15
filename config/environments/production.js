module.exports = {
    web: {
        port: process.env.PORT,
        ssl: require('../ssl')
    },
    logging: {
        appenders: {
            out: { type: 'console' },
            gelf: { type: '@log4js-node/gelf', host: '', port: 12201, hostname: '' }
        },
        categories: {
            default: { appenders: [ 'gelf' ], level: 'warn' },
            out: { appenders: [ 'out' ], level: 'warn' }
        }
    }
};
