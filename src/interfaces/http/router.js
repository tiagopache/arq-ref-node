const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');

module.exports = ({ config, containerMiddleware, loggerMiddleware, errorHandler, notFoundHandler, swaggerMiddleware }) => {
    const router = Router();

    /* istanbul ignore if */
    if (config.env === 'development') {
        const statusConfig = {
            title: 'Express Status', // Default title
            path: '/status',
            spans: [{
                interval: 1, // Every second
                retention: 60 // Keep 60 datapoints in memory
            }, {
                interval: 5, // Every 5 seconds
                retention: 60
            }, {
                interval: 15, // Every 15 seconds
                retention: 60
            }],
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                responseTime: true,
                rps: true,
                statusCodes: true
            },
            healthChecks: [{
                protocol: 'http',
                host: 'localhost',
                path: '/api/users',
                port: config.web.port
            }, {
                protocol: 'http',
                host: 'localhost',
                path: '/api/users/0',
                port: config.web.port
            }],
            ignoreStartsWith: '/admin'
        };
        router.use(statusMonitor(statusConfig));
    }

    /* istanbul ignore if */
    if (config.env !== 'test') {
        router.use(loggerMiddleware);
    }

    const apiRouter = Router();

    apiRouter
        .use(methodOverride('X-HTTP-Method-Override'))
        .use(cors())
        .use(bodyParser.json())
        .use(compression())
        .use(containerMiddleware)
        .use('/docs', swaggerMiddleware);

    /*
     * Add your API routes here
     *
     * You can use the `controllers` helper like this:
     * apiRouter.use('/users', controller(controllerPath))
     *
     * The `controllerPath` is relative to the `interfaces/http` folder
     */

    apiRouter.use('/users', controller('user/UsersController'));

    router.use('/api', apiRouter);

    router.use(notFoundHandler);

    router.use(errorHandler);

    return router;
};
