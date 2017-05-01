# CI346-Fire-Dragon
CI346 Programming Assignment

Live server running on Digital Ocean Droplet: http://46.101.73.65:8090/


# Running the Program
The entire project can be packaged into a docker container. A simple `docker-compose up` in the project directory should run everything and the application should be listening on port 8090 by default. 

If running the docker-compose for the second time, remember to use `docker-compose build` first to build the images with the new changes as docker-compose does not build newer images.


# Debugging the Program
`npm start-dev` should run the server in development mode according to the package.json and also `npm start` in Public/Fire.


# HATEOAS Implementation
The Application REST API features HATEOAS records for all resources made available in the API. A simple API call to a sample URI such as `http://localhost:8090/shift/58ff508d7a7d2a3bd50b2ef0` should return the record for a shift object alongside the HATEOAS information for all entitites in the JSON


# Automated test of the web app
[Nighwatch.js](http://nightwatchjs.org/) was used to perform all the end to end tests of the web app, testing all the key functionalities of the application. The test scripts are located in `tests/e2e/`


# ToDo
- [x] Setup Project
- [x] Implement tests
- [x] Setup deployment scripts
- [x] Setup Jenkins deployment
- [x] AngularJS FrontEnd basic setup
- [x] Switch to ExpressJS/Nodejs for server-side
    - [x] Serve the web client
- [x] Employee Model CR-UD and Controller
- [x] Employee Shift CRUD and Controller
- [x] Employee - Shift REST API mapping
- ~~[ ] Keycloak Auth basic setup~~
- [x] Passportjs auth & Angular client ouath/ Keycloak setup (Local and remote using docker)
- [x] Automated test of the web app 

# Extensions
- [x] HATEOAS Implementation
- [x] Docker Compose setup && http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
- ~~[ ] HTTPS/SSL Setup keycloak~~
- ~~[ ] Deploy to uni-projects.ibraheemaj.xyz/ci346/~~
- [ ] Employee Model CR-UD and Controller
- [ ] Employee Shift CR-UD and Controller
- [ ] API Rate Limiting https://github.com/teechap/kitura-limiter
- [ ] Employee Detail Dialog to show more information
- [ ] Authentication using 3rd party OAuth (Facebook, Twitter, Google)
- [ ] Telemetry (https://goaccess.io/)
- [ ] Jenkins setup
- [ ] Scaling using Kubernettes
- [ ] Documentation using JDoc https://github.com/jsdoc3/jsdoc 
- [ ] Sending out Emails to new users
- [ ] More End to End Testing using http://nightwatchjs.org/ 
