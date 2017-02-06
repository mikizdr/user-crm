// BASE SETUP
// ==========================================

var express     = require('express');       // call ecpress
var app         = express();                // define our app using express
var bodyParser  = require('body-parser');   // get body-parser
var morgan      = require('morgan');        // use to see request in the console
var mongoose    = require('mongoose');      // for working with database
var jwt         = require('jsonwebtoken');  // grab jsonwebtoken package in our server
var path        = require('path');

var config      = require('./config');

// Cross Origin Reseources Sharing
var cors        = require('./services/cors');

// pull in user mode from app/models/user
var User        = require('./app/models/user');

// APP CONFIGUTATION ---------------------
// use body parser so we can grab indormtion from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MIIDLEWARE
// configure our app to handle CORS requests
app.use(cors);

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on mlab)
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function(err, db) {
    if(!err) {
        console.log('We are connected to mongo!');
    }
});

// basic route for the home page
// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


// ROUTES IN OUR APP
// REGISTER OUR ROUTES
// all our routes will be prefixed with /admin
var apiRouter	= require('./app/routes/api')(app, express);
var adminRoutes = require('./app/routes/admin')(app, express);
var loginRoutes = require('./app/routes/login')(app, express);

// route to create and get users
var createUsers = require('./app/routes/api/createUser')(app, express);
app.use('/api', createUsers);

// route to update, delete and get info for user with ID
var actionOnUsers = require('./app/routes/api/actionOnUsers')(app, express);
app.use('/api', actionOnUsers);

app.use('/api', apiRouter);
app.use('/admin', adminRoutes);
app.use('/', loginRoutes);

app.listen(config.port, function() {
	console.log('Magic happens on port ', config.port);
});