// grab the stuffs we need
var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');



module.exports = function(app, express) {

    // get an instance of the express router
    var apiRouter = express.Router();

    // middleware to use for all requests
    apiRouter.use(function(req, res, next) {

        // log somethintg to know what we do
        console.log('Somebody just came to our app!');

        // continue to the next step
        next();
    });

    // test route to make sure everything is working fine
    apiRouter.get('/', function(req, res) {
        res.json({messge: 'Hooray! This is our first API!'});
    });

    return apiRouter;
};