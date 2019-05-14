const { ModelsLoader } = require('src/infra/mongoose');
const mongoose = require('mongoose');
const { db: config } = require('config');

const getMongoURL = (config) => {
    const userPass = config.username && config.password ? `${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@` : null;
    const url = config.servers
        .reduce((prev, cur) => prev + cur + ',', `mongodb://${userPass}`);

    const finalUrl = `${url.substr(0, url.length - 1)}/${config.database}`;

    return finalUrl;
};

const getConnOptions = (config) => {
    const options = config.options ? config.options : {};

    options.useNewUrlParser = true;
    options.useFindAndModify = false;

    return options;
};

if (config) {
    mongoose.Promise = global.Promise;
    const connOptions = getConnOptions(config);
    const connection = mongoose.createConnection(getMongoURL(config), connOptions);
    module.exports = ModelsLoader.load({
        mongoose: connection,
        baseFolder: __dirname
    });
} else {
    /* eslint-disable no-console */
    console.error('Database configuration not found, disabling database.');

}
