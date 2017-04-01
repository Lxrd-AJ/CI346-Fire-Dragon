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

        // emp_promises = emps.map((e) => {
        //     _e = e.toObject();
        //     return e.shifts().then((shifts) => {
        //         _e.shifts = shifts;
        //         return _e;
        //     })
        // })
        // Q.allSettled(emp_promises).then((value_states) => {
        //     value_states = value_states.filter((v) => v.state == "fulfilled")
        //     results = value_states.map((x) => x.value)
        //     res.json(results);
        // })
    });
}