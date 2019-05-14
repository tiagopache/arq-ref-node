const container = require('src/container');
const appInsights = require('applicationinsights');

const appInsightsKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || '';

if (appInsightsKey) {
    appInsights.setup(appInsightsKey).start();
}

const app = container.resolve('app');

app
    .start()
    .catch((error) => {
        app.logger.error(error.stack);
        process.exit();
    });
