const Mongoose = require('mongoose');
const Shift = Mongoose.model("Shift", require('./Shift.js'))

const EmployeeSchema = Mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

EmployeeSchema.virtual('shifts').get(() => {
    Shift.find()
})

module.exports = EmployeeSchema