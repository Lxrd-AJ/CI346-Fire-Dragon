const Mongoose = require('mongoose')
const Shift = Mongoose.model("Shift", require('./../Models/Shift.js'))
const Employee = Mongoose.model("Employee", require('./../Models/Employee.js'));

/**
 * Returns all the shifts alongside HATEOAS information
 */
exports.getShifts = (req, res) => {
    Shift.find({}).populate('employees').then((shifts) => {
        shifts = shifts.map((shift) => {
            shift = shift.toJSON();
            shift["links"] = [{
                "rel": "self",
                "href": req.protocol + '://' + req.get('host') + req.originalUrl + `/${shift._id}`
            }];
            return shift;
        })
        res.json(shifts)
    })
}

/**
 * Returns information for a particular shift, to avoid cyclic relationships in the model schema
 * files, the employees assigned to a shift are fetched here as opposed to instance methods in schema
 * declaration
 */
exports.getShift = (req, res) => {
    Shift.findOne({ _id: req.params.id }).populate('employees').then((shift) => {
        const employees = shift.employees.map((emp) => {
            emp = emp.toObject();
            emp["links"] = [{
                "rel": "self",
                "href": req.protocol + '://' + req.get('host') + `/employee/${emp._id}`
            }]
            return emp;
        });
        
        shift = shift.toObject();
        shift.employees = employees;
        shift["links"] = [{
            "rel": "self",
            "href": req.protocol + '://' + req.get('host') + req.originalUrl //+ `/${shift._id}`
        }];
        res.json(shift)
    })
}

exports.createShift = (req,res) => {
    const shiftJSON = req.body['shift']
    const shift = new Shift({
        name: shiftJSON['name'],
        startDate: shiftJSON['startDateTime'],
        endDate: shiftJSON['endDateTime'],
        employees: shiftJSON['employees']
    });
    shift.save().then((shift) => {
        shift = shift.toJSON();
        shift["links"] = [{
            "rel": "self",
            "href": req.protocol + '://' + req.get('host') + req.originalUrl + `/${shift._id}`
        }];
        res.json(shift);
    }, (err) => res.status(400).send(err));
}


