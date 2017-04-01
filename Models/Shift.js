const Mongoose = require('mongoose');
const ShiftSchema = Mongoose.Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    employees: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
})

module.exports = ShiftSchema