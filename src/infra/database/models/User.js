'use strict';
const { Schema } = require('mongoose');

module.exports = mongoose => {

    const userSchema = new Schema({
        name: String,
        age: Number
    });

    const UserModel = mongoose.model('user', userSchema);

    return UserModel;
};












