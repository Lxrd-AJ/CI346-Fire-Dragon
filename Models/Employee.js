const Mongoose = require('mongoose');
const Shift = Mongoose.model("Shift", require('./Shift.js'))

const EmployeeSchema = Mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

EmployeeSchema.methods.shifts = function(){
    return Shift.find({ employees: this._id }) //{$in: [this._id]}
                .then((shifts) => shifts,(err) => console.error(err))
}

module.exports = EmployeeSchema