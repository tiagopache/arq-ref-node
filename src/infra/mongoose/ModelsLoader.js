const fs = require('fs');
const path = require('path');


module.exports = {
    load({ mongoose, baseFolder, indexFile = 'index.js' }) {
        const loaded = {};

        fs
            .readdirSync(baseFolder)
            .filter((file) => {
                return (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js');
            })
            .forEach((file) => {
                const model = require(path.join(baseFolder, file));
                const modelName = file.split('.')[0];
                loaded[modelName] = model(mongoose);
            });

        loaded.database = mongoose;

        return loaded;
    }
};

