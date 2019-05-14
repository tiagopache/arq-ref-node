const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
    web: {
        port: process.env.PORT || 3000
    },
    logging: {
        appenders: {
            out: { type: 'console' },
            task: {
                type: 'file',
                filename: logPath
            }
        },
        categories: {
            default: { appenders: [ 'out' ], level: 'trace' },
            task: { appenders: [ 'task' ], level: 'trace' }
        }
    }
};
