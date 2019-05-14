/* eslint-disable no-console */
const path = require('path');
const { Seeder } = require('mongo-seeding');
const { db: config } = require('../../../../config');

const concatOptions = (config) => {
    const options = config.options ? config.options : {};

    options.useNewUrlParser = true;
    options.useFindAndModify = false;

    let concat = '';

    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            const element = options[key];
            concat += `${key}=${element}&`;
        }
    }

    concat = concat.substr(0, concat.length - 1);

    return concat;
};

const defaultConfig = {
    database: `mongodb://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.servers[0]}/${config.database}?${concatOptions(config)}`,
    dropDatabase: false,
    dropCollections: false,
};

const seeder = new Seeder(defaultConfig);
const collections = seeder.readCollectionsFromPath(
    path.resolve('./src/infra/database/seeds/mocks/'),
    {
        //transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    },
);

seeder
    .import(collections)
    .then(() => {
        console.log('Success!');
    })
    .catch(err => {
        console.log(err);
    });

