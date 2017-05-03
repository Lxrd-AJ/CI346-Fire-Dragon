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
const RateLimit = require('express-rate-limit');

const App = Express();
const User = Mongoose.model("User", require('./Models/User.js'));
const publicDir = Path.join(__dirname,"Public");



/**
 * Database Setup using Mongoose
 */
//console.info(process.env); //DEBUG Only
if ( process.env.DB_NAME ) {
    MONGO_DB = `mongodb://${process.env.DB_NAME}:27017/FireDragon`;
} else {
    MONGO_DB = "mongodb://localhost/FireDragon";
}
Mongoose.connect(MONGO_DB);
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
 * API Rate limiting setup
 */
App.enable('trust proxy'); //Reverse proxy on Nginx setup
App.use( new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, //each IP is limited to 100 requests per windowMs,
    delayMs: 0,
    keyGenerator: (req) => { return req.user ? req.user._id : req.ip; },
    handler: (req, res) => {
        res.format({
            html: () => { res.status(500).end("API Rate limit reached") },
            json: () => { res.status(500).json("API Rate limit reached") }
        })
    }
}))


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
//TODO: Ensure the username is unique before creating a new user 
App.post("/signup", (req,res,next) => {
    const user = new User({
        username: req.body['username'],
        password: req.body['password']
    });
    console.info("-> /signup: Attempting to create account for " + user.username);
    return user.save().then((_user) => {
        console.info(_user);
        req.logIn(_user,(err) => {
            if(err){ next(err); }
            console.info(`User ${user.username} Successfully created and logged in`);
            return res.json({ user: _user, message:"Account created and authenticated" });
        })
    }, (err) => res.status(400).send(err)).catch((err) => console.error(err));
});
App.post('/login', (req,res,next) => {
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
                signup = false;
                message = "Invalid Login details"
            }else{
                console.info("No user found matching logon");
                signup = true;
                message = "User not found"
            }
            res.json({ signup:signup, message:message })
        }else if(!err){
            console.info("-> /login : " + user.username);
            req.logIn(user,(err) => {
                if(err){ return next(err); }
                console.info(`Successfully logged ${user.username} in`)
                return res.json({ signup: false, user: user, message:"Successfully authenticated" })
            })
        }
    })(req,res,next);
});

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
App.delete('/employee/:id', EmployeeCtrl.deleteEmployee);

/**
 * Shift REST Handlers
 */
App.get('/shift', ShiftCtrl.getShifts);
App.get("/shift/:id", ShiftCtrl.getShift);
App.post('/shift', ShiftCtrl.createShift);

App.all("*", (req,res,next) => {
    console.info("*** Unmatched URL");
    console.log(req)
    next()
})

App.listen( process.env.PORT || 8090 , function(){
    console.info("Server started on port 8090");
})
