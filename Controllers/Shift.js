const Mongoose = require('mongoose')
const Shift = Mongoose.model("Shift", require('./../Models/Shift.js'))

exports.getShifts = (req, res) => {
    Shift.find({}).populate('employees').then((shifts) => res.json(shifts))
}

exports.createShift = (req,res) => {
    const shiftJSON = req.body['shift']
    const shift = new Shift({
        name: shiftJSON['name'],
        startDate: shiftJSON['startDateTime'],
        endDate: shiftJSON['endDateTime'],
        employees: shiftJSON['employees']
    });
    shift.save().then((shift) => res.json(shift), (err) => res.status(400).send(err));
}


