const Mongoose = require("mongoose");
const Employee = Mongoose.model("Employee", require('./../Models/Employee.js'));
const Q = require('q')

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
    Employee.find({}).then((emps) => res.json(emps))
}

exports.getEmployee = (req,res) => {
    Employee.findOne({ _id: req.params.id}).then((emp) => {
        emp.shifts().then((shifts) => {
            _emp = emp.toObject();
            _emp.shifts = shifts;
            res.json(_emp);
        });
    });
}