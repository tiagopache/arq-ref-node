const UserSerializer = {
    serialize({ id, name, age }) {
        return {
            id,
            name,
            age
        };
    }
};

module.exports = UserSerializer;
