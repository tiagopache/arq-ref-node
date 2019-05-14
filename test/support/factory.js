const path = require('path');
const { factory, MongooseAdapter } = require('factory-girl');
const { FactoriesLoader } = require('src/infra/factoryGirl');
const models = require('src/infra/database/models');

const factoryGirl = new factory.FactoryGirl();
factoryGirl.setAdapter(new MongooseAdapter());

module.exports = FactoriesLoader.load({
    factoryGirl,
    models,
    baseFolder: path.join(__dirname, 'factories')
});
