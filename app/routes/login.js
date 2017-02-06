module.exports = function(app, express) {
    // get an instance of the router
    var loginRouter = express.Router();

    // call .route() method to define multiple actions on a single login route
    loginRouter.route('/login')

        // show the form (GET http://localhost:1337/login)
        .get(function(req, res) {
            console.log('Route: GET http://localhost:1337/login')
            res.send('This is the login form.');
        })

        // process the form (POST http://localhost:1337/login)
        .post(function(req, res) {
            console.log('Route: POST http://localhost:1337/login')
            res.send('Processing the login form');
        })

    return loginRouter;
};