//const UserMapper = require('./InMemoryUserMapper');
const User = require('src/domain/user/User');
const identifierGenerator = require('src/infra/support/identifierGenerator');

class InMemoryUsersRepository {
    constructor() {
        this.index = 1;
        this.data = [];
    }

    get(id) {
        if (id) {
            return this._getById(id);
        } else {
            return this.data;
        }
    }

    add(user) {
        const { valid, errors } = user.validate();

        if (!valid) {
            const error = new Error('ValidationError');
            error.details = errors;

            throw error;
        }

        const newUser = user;
        const rowId = this.index++;

        newUser.id = rowId;
        newUser.user_id = identifierGenerator.newUUID();

        this.data.push(newUser);

        return newUser;
    }

    remove(id) {
        // eslint-disable-next-line no-unused-vars
        var found = false;
        // eslint-enable-next-line no-unused-vars
        this.data = this.data.filter(element => {
            if (element.id === id) {
                found = true;
            } else {
                return element.id !== id;
            }
        });
    }

    update(id, newData) {
        let user = this._getById(id);
        try {
            if (user) {

                const newUser = new User(Object.assign(Object.getOwnPropertySymbols(user)[0], newData));

                const { valid, errors } = newUser.validate();

                if (!valid) {
                    const error = new Error('ValidationError');
                    error.details = errors;

                    throw error;
                }

                Object.assign(user, newData);

            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    count() {
        return this.data.length;
    }

    // Private

    _getById(id) {
        try {
            return this.data.find(element => {
                return element.id === id;
            });
        } catch (error) {
            if (error.name === 'EmptyResultError') {
                const notFoundError = new Error('NotFoundError');
                notFoundError.details = `User with id ${id} can't be found.`;

                throw notFoundError;
            }

            throw error;
        }
    }
}


module.exports = InMemoryUsersRepository;
