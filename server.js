const Express = require('express');
const Path = require("path");
const Mongoose = require('mongoose');
const EmployeeCtrl = require("./Controllers/Employee.js");
const ShiftCtrl = require("./Controllers/Shift.js");
const bodyParser = require('body-parser');
const logger = require('morgan');
const _keycloak = require('keycloak-connect');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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
//In-memory datastore
App.use( session({
    secret: '3nt3rth3dr4g0n',
    store: new MongoStore({ mongooseConnection: Mongoose.connection }), 
    resave: false,
    saveUninitialized: true
}))


App.use(Express.static(publicDir))
App.use(Express.static(publicDir + "/Fire/dist/"))
App.use(bodyParser.json());
App.use(logger('short'));



/**
 * Authentication setup
 */
const Keycloak = new _keycloak({
    //store: MemoryStore
});
//Application middleware to secure entire Application
App.use( Keycloak.middleware({
    logout: '/logout',
    admin: '/admin'
}) );
//Authentication call back URL
App.post('/auth', (req,res,next) => {
    console.info(req.session);
    console.info("*** Authentication callback");
    console.info(req);
    next();
})
App.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8090, http://127.0.0.1:8090');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


App.get('/', (req,res) => {
    res.sendFile(`${publicDir}/Fire/dist/index.html`);
})


/**
 * Employee REST Handlers
 */
App.get('/employee', Keycloak.protect(), EmployeeCtrl.getEmployees);
App.get('/employee/:id', EmployeeCtrl.getEmployee);
App.get('/employee/:id/shift', EmployeeCtrl.getEmployee);
App.post('/employee', EmployeeCtrl.createEmployee);

/**
 * Shift REST Handlers
 */
App.get('/shift', ShiftCtrl.getShifts);
App.post('/shift', ShiftCtrl.createShift);

App.all("*", (req,res) => {
    console.info("*** Unmatched URL");
    console.log(req)
})

App.listen(8090, function(){
    console.info("Server started on port 8090");
})