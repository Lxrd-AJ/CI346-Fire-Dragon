const Mongoose = require("mongoose");
const Employee = Mongoose.model("Employee", require('./../Models/Employee.js'));
const Q = require('q')

/**
 * Creates a new employee in the data store and returns the newly created employee 
 * with the HATEOAS information
 */
exports.createEmployee = (req,res) => {
    const empJSON = req.body['employee'];
    const employee = new Employee({
        name: empJSON.name,
        age: empJSON.age
    })
    employee.save().then((emp) => {
        _emp = emp.toJSON();
        _emp["links"] = employeeHATEOAS(emp,req);
        res.json(_emp);
    }, (error) => {
        res.status(400).send(error)
    })
}

/**
 * Returns all the employees in the data store with their HATEOAS information present
 */
exports.getEmployees = (req,res) => {
    Employee.find({}).then((emps) => {
        emps = emps.map((emp) => {
            emp = emp.toJSON();
            emp["links"] = employeeHATEOAS(emp,req);
            return emp;
        })
        res.json(emps)
    })
}

/**
 * Returns an employee record, alongside the shifts assigned to the employee 
 * The HATEOAS resource is also present for the employee
 */
exports.getEmployee = (req,res) => {
    Employee.findOne({ _id: req.params.id}).then((emp) => {
        emp.shifts().then((shifts) => {
            _emp = emp.toObject();
            _emp.shifts = shifts;
            _emp["links"] = [{
                "rel": "self",
                "href": req.protocol + '://' + req.get('host') + req.originalUrl
            }]
            res.json(_emp);
        });
    });
}

/**
 * Helper function to generate employee resource HATEOAS data
 */
employeeHATEOAS = (employee, req) => {
    return [{
        "rel": "self",
        "href": req.protocol + '://' + req.get('host') + req.originalUrl + `/${employee._id}`
    }]
}