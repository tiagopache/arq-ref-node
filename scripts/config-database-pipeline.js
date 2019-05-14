const path = require('path');
const Listr = require('listr');
const { writeFileSync } = require('fs');

const cfgPath = path.join(__dirname, '..', 'config');

const tasks = new Listr([
    {
        title: 'Create database config to run CI',
        task() {
            writeFileSync(
                path.join(cfgPath, 'database.js'),
                'module.exports = ' + `{
                    test: {
                        username: process.env.DB_USERNAME || 'admin',
                        password: process.env.DB_PASSWORD || 'p1c4d1nh0',
                        database: process.env.DB_NAME || 'arqref-p1-db-testonly',
                        servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : ['127.0.0.1:27017'],
                        dialect: 'mongodb',
                        logging: null,
                        options: {
                            authSource: 'admin',
                        }
                    },
                    development: {
                        username: process.env.DB_USERNAME || 'admin',
                        password: process.env.DB_PASSWORD || 'p1c4d1nh0',
                        database: process.env.DB_NAME || 'arqref-p1-db-devonly',
                        servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : ['127.0.0.1:27017'],
                        dialect: 'mongodb',
                        logging: null,
                        options: {
                            authSource: 'admin',
                        }
                    },
                    production: {
                        username: process.env.DB_USERNAME || 'admin',
                        password: process.env.DB_PASSWORD || 'p1c4d1nh0',
                        database: process.env.DB_NAME || 'arqref-p1-db',
                        servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : ['127.0.0.1:27017'],
                        dialect: 'mongodb',
                        logging: null,
                        options: {
                            authSource: 'admin',
                        }
                    }
                };`//, null, '  ')
            );
        }
    }
]);

tasks.run().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
});
