// grab the stuffs we need
var config  = require('../../../config');
var User    = require('../../models/user');
var jwt     = require('jsonwebtoken');

// define moduls to export data
module.exports = function(app, express) {

    // make an instance of express router
    var createUser = express.Router();

    // use .route method to handle POST and GET method
    // for /api/user route
    createUser.route('/users')

        // create a user (accessed at http://localhost:8080/api/users)
        .post(function(req, res) {

            // create a new instance of the User model
            var user = new User();

            // set the users information (comes from the request)
            user.name   = req.body.name;
            user.username   = req.body.username;
            user.password   = req.body.password;

            // save the user and check for the errors
            user.save(function(err) {
                if (err) {
                    
                    // if there is duplicate enter
                    if (err.code == 11000) 
                        return res.json({ message: 'A user with that username already exists.'});
                    else 
                        return res.send(err);
                }

                res.json({ message: 'User created.'});
            });
        })

        // show all users that exist in database
        // (accessed at http:localhost:8080/api/users)
        .get(function(req, res) {
            User.find(function(err, users) {

                if (err) return res.send(err);

                // return the users
                res.json(users);
            });
        });

        return createUser;
};