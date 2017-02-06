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

            console.log('KUKURIKU: ', req.params.user_id);
            
            User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);

                // return that user
                res.json(user);
            });
        })



        return actionOnUser;

};