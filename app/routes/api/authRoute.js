// grab the stuffs we need
var config  = require('../../../config');
var User    = require('../../models/user');
var jwt     = require('jsonwebtoken');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

    var authUser = express.Router();

    // route to authenticate a user
    // accessed at POST http://localhost:8080/api/authenticate
    authUser.post('/authenticate', function(req, res) {

        // find the user
        // select the name, username and password explicitly
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user) {

            if (err) throw err;

            // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                
                //check if password matches
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create token
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresIn: '24h' // expires in 24 h
                    });

                    // return the information including token as json
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });

    });

    return authUser;
};