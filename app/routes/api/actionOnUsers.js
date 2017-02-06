// grab the stuffs we need
var config  = require('../../../config');
var User    = require('../../models/user');
var jwt     = require('jsonwebtoken');

// define module that export routes action
module.exports = function(app, express) {

    // make an instance of express router
    var actionOnUser = express.Router();

    // routes that end with /users/:user_id
    // ------------------------------------
    actionOnUser.route('/users/:user_id')

        // get the user with that ID
        // (accessed at http://localhost:8080/api/users/:user_id)
        .get(function(req, res) {
            
            User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);

                // return that user
                res.json(user);
            });
        })

        // update the user with this id
        // (accessed at PUT http://localhost:8080/api/users/:user_id)
        .put(function(req, res) {

            // use our user model to find the user we want
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

                // update the user info only if its new
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;

                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return the message
                    res.json({ message: 'User updated!'});
                });

            });
        })



        return actionOnUser;

};