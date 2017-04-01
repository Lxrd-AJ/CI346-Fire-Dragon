const Express = require('express');
const Path = require("path");
const Mongoose = require('mongoose');
const EmployeeCtrl = require("./Controllers/Employee.js");
const ShiftCtrl = require("./Controllers/Shift.js");
const bodyParser = require('body-parser');
const logger = require('morgan');

const App = Express();
const publicDir = Path.join(__dirname,"Public");


/**
 * Database Setup using Mongoose
 */
Mongoose.connect('mongodb://localhost/FireDragon')
const Database = Mongoose.connection;
Database.on("error", console.error.bind(console,"Connection Error:"));
Database.once("open", () => {
    console.info("Successfully connected to the database");
})


App.use(Express.static(publicDir))
App.use(Express.static(publicDir + "/Fire/dist/"))
App.use(bodyParser.json());
App.use(logger('short'));

App.get('/', (req,res) => {
    res.sendFile(`${publicDir}/Fire/dist/index.html`);
})

/**
 * Employee REST Handlers
 */
App.get('/employee', EmployeeCtrl.getEmployees);
App.post('/employee', EmployeeCtrl.createEmployee);

/**
 * Shift REST Handlers
 */
App.get('/shift', ShiftCtrl.getShifts);
App.post('/shift', ShiftCtrl.createShift);


App.listen(8090, function(){
    console.info("Server started on port 8090");
})