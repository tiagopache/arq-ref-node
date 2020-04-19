const express = require('express');
const helmet = require('helmet');
const nocache = require('nocache');
const spdy = require('spdy');

class Server {
    constructor({ config, router, logger }) {
        this.config = config;
        this.logger = logger;
        this.express = express();

        this.express.use(helmet());
        this.express.use(nocache());
        this.express.use(router);
    }

    start() {
        return new Promise((resolve) => {
            const server = spdy.createServer(this.config.web.ssl, this.express)
                .listen(this.config.web.port, () => {
                    const { port } = server.address();
                    this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
                    resolve();
                });
        });
    }
}

module.exports = Server;
