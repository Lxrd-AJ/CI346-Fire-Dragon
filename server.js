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
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const App = Express();
const User = Mongoose.model("User", require('./Models/User.js'));
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
}));
Mongoose.Promise = require('q').Promise;


App.use(Express.static(publicDir))
App.use(Express.static(publicDir + "/Fire/dist/"))
App.use(bodyParser.json());
App.use(logger('short'));



/**
 * Authentication setup
 * 
 * - The Local Strategy uses a simple Username and Password data to match the user to authenticate 
 * - Irrespective of the strategy used, a session would be created for the current authenticated user
 *      via the MongoStore as setup above, so the currently authenticated user can be retrieved via 
 *      `req.session.user`
 */
//Initial setup
App.use(Passport.initialize());
App.use(Passport.session());
//Passport local strategy 
Passport.use(new LocalStrategy((username,password,done) => {
    console.info("-> LocalStrategy");
    console.info("Authenticating " + username + ":" + password);
    return User.findOne({ username: username }).exec().then((user) => {
        if(!user){ return done(null,false,{message: "Incorrect username"}) }
        if(user.password !== password){ return done(null,false,{message: "INVALID_PASSWORD"}) }
        console.info("Found user: " + user.username );
        return done(null, user);
    },(err) => done(err)).catch((err) => {
        console.error(err);
    })
}));
//Serializing and Deserialising strategy via cookie passed by the client 
Passport.serializeUser((user,done) => done(null, user._id));
Passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => done(null,user),(err) => done(err,false));
});
//Authentication Route
//NB: Angular2 does not allow redirects as the client-side is more independent of the server,
//      therefore, send the redirect data instead of doing a redirect from the server
App.post('/login', (req,res,next) => {
    let relay = "/#/employee";
    let signup = true;
    Passport.authenticate('local',(err,user,info) => {
        if(err){
            console.info("An error occured in /login");
            console.error(err);
            return next(err);
        }
        if(!user){
            if(info.message === "INVALID_PASSWORD"){
                console.info("Wrong password")
                signup = false; relay = "/#/login"
            }else{
                console.info("No user found matching logon");
                relay = "/#/signup"; signup = true;
            }
            res.json({ signup:signup, relay:relay })
        }else if(!err){
            console.info("-> /login : " + user.username);
            req.logIn(user,(err) => {
                if(err){ return next(err); }
                console.info("Redirecting user to " + relay)
                return res.redirect(`${relay}`)
            })
        }
    })(req,res,next);
});
//TODO: Create Signup route


App.get('/', (req,res) => {
    res.sendFile(`${publicDir}/Fire/dist/index.html`);
})


/**
 * Employee REST Handlers
 */
App.get('/employee', EmployeeCtrl.getEmployees);
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