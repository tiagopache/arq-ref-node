module.exports = {
    web: {
        ssl: require('../ssl')
    },
    logging: {
        appenders: {
            out: { type: 'console' }
        },
        categories: {
            default: { appenders: [ 'out' ], level: 'trace' }
        }
    }
};
