const Mongoose = require('mongoose');
const EmployeeSchema = Mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

module.exports = EmployeeSchema