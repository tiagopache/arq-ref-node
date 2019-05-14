module.exports = {
    web: {},
    logging: {
        appenders: {
            out: { type: 'console' }
        },
        categories: {
            default: { appenders: [ 'out' ], level: 'trace' }
        }
    }
};
