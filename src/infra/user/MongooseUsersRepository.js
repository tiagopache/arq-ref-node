const UserMapper = require('./MongooseUserMapper');
class MongooseUsersRepository {
    constructor({ UserModel }) {
        this.UserModel = UserModel;
    }

    async getAll(...args) {
        const users = await this.UserModel.find(...args);

        return users.map(UserMapper.toEntity);
    }

    async getById(id) {
        const user = await this._getById(id);

        return UserMapper.toEntity(user);
    }


    async add(user) {
        const { valid, errors } = user.validate();

        if (!valid) {
            const error = new Error('ValidationError');
            error.details = errors;

            throw error;
        }

        const newUserModel = this.UserModel(UserMapper.toDatabase(user));

        const newUser = await newUserModel.save();

        return UserMapper.toEntity(newUser);
    }

    async remove(id) {
        const user = await this.UserModel.findOneAndDelete({_id: id});

        if(!user) throw new Error('NotFoundError');
        return;
    }

    async update(id, newData) {
        try {
            const userExisting = await this._getById(id);
            if(!userExisting) throw new Error('NotFoundError');

            const newUser = UserMapper.toEntity(Object.assign(userExisting, newData));

            const { valid, errors } = newUser.validate();

            if (!valid) {
                const error = new Error('ValidationError');
                error.details = errors;

                throw error;
            }

            const userUpdated = await this.UserModel.findOneAndUpdate({_id: id}, UserMapper.toDatabase(newUser), { new: true });

            return UserMapper.toEntity(userUpdated);
        } catch (error) {
            throw error;
        }
    }

    async count() {
        return await this.UserModel.countDocuments();
    }

    // Private

    async  _getById(id) {
        try {
            const user = await this.UserModel.findOne({_id: id});
            if (!user) {
                const notFoundError = new Error('NotFoundError');
                notFoundError.details = `User with id ${id} can't be found.`;

                throw notFoundError;
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = MongooseUsersRepository;
