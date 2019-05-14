const User = require('src/domain/user/User');

function _symbolToJson(symbol) {
    return JSON.parse(JSON.stringify(symbol));
}

const MongooseUserMapper = {
    toEntity( dataValues ) {
        const { _id, name, age } = dataValues;

        return new User({ id: _id.toString(), name, age});
    },

    toDatabase(survivor) {
        const attributes = Object.keys(_symbolToJson(survivor)).reduce((prev, curr) => {
            if(survivor[curr]) return Object.assign(prev, { [curr]: survivor[curr] });
        }, {});

        return attributes;
    }
};

module.exports = MongooseUserMapper;
