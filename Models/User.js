const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
    username: String,
    password: String
})

module.exports = UserSchema;