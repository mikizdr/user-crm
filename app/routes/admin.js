module.exports = function(app, express) {
    // get an instance of the router
    var adminRouter = express.Router();

    // route middleware that will happen on every request
    adminRouter.use(function(req, res, next) {

        // log each request to the console
        console.log(req.method, req.url);

        // continue doing what we were doing and go to the route
        next();
    })

    // route middleware to validate :name
    adminRouter.param('name', function(req, res, next, name) {

        // do something
        console.log('doing name validation on ' + name);

        // once validation is done save the new item in the req
        req.name = name;
        // go to the next thing
        next();
    })

    // route with parameters (http://localhost:1337/admin/users:name)
    adminRouter.get('/users/:name', function(req, res) {
        res.send("Hello " + req.params.name + '!');
    });

    // admin main page - the dashboard (http://localhost:1337/admin)
    adminRouter.get('/', function(req, res) {
        res.send('I am the dashboard!');
    });

    // users page (http://localhost:1337/admin/users)
    adminRouter.get('/users', function(req, res) {
        res.send('I show all the users');
    });

    // posts page (http://localhost:1337/admin/posts)
    adminRouter.get('/posts', function(req, res) {
        res.send('I show all the posts!')
    });

    return adminRouter;
};