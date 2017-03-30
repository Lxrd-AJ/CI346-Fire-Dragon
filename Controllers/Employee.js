const Mongoose = require("mongoose");
const Employee = Mongoose.model("Employee", require('./../Models/Employee.js'));

exports.createEmployee = (req,res) => {
    const empJSON = req.body['employee'];
    const employee = new Employee({
        name: empJSON.name,
        age: empJSON.age
    })
    employee.save().then((emp) => {
        res.json(emp);
    }, (error) => {
        res.status(400).send(error)
    })
}

exports.getEmployees = (req,res) => {
    Employee.find({}).then((emp) => res.json(emp));
}