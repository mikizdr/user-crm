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

// set static file location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// basic route for the home page
// send our index.html file to the user for the home page
//app.get('/', function(req, res) {
//	res.sendFile(path.join(__dirname + '/index.html'));
//});


// ROUTES IN OUR APP
// REGISTER OUR ROUTES
// all our routes will be prefixed with /admin
var apiRouter	= require('./app/routes/api')(app, express);
var adminRoutes = require('./app/routes/admin')(app, express);
var loginRoutes = require('./app/routes/login')(app, express);

// route to authenticate users
var authUsers	= require('./app/routes/api/authRoute')(app, express);
app.use('/api', authUsers);

// Route Middleware to Protect API Routes
// to check the token on every request for our authenticated routes
// midleware to use for all requests
// this is where we will authenticate users
// to check the token on every request for our authenticated routes. 

var appRouter = express.Router();

appRouter.use(function(req, res, next) {

	// do logging
	console.log('Somebody just came to our app!');

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret snd checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(403)({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;

				// we go to the next routes and don`t stop here
				next();
			}
		});
	} else {

		// if there is no token
		// return an HTTP response of 403 (access forbiden) and an error message
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
	
	// next(); // used to be here but it have moved to be in if/else statement so that
	// our users will only continue forward if they have a valid token and it verified correctly
});

// route to create and get users
var createUsers = require('./app/routes/api/createUser')(app, express);
app.use('/api', createUsers);

// route to update, delete and get info for user with ID
var actionOnUsers = require('./app/routes/api/actionOnUsers')(app, express);
app.use('/api', actionOnUsers);

app.use('/api', apiRouter);
app.use('/admin', adminRoutes);
app.use('/', loginRoutes);

// MAIN CATCHALL ROUTE ---------------------
// SEND USERS TO FRONTEND ------------------
// has to be registered after API ROUTES
// Using the * will match all routes.It is important to 
// put this route after the API routes since we only
// want it to catch routes not handled by Node. 
// If this were placed above the API routes, 
// then our user would always be sent the index.html 
// file and never even get to the API routes.
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port, function() {
	console.log('Magic happens on port ', config.port);
});