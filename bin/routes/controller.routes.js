// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  Router	= require('../controllers/router.controller.js').router
    //,glob = require('glob')
     ;

// -------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW ROUTES ************************************** //
// -------------------------------------------------------------------------------------------------------- //
var RegisterRoutes = function(){
  var router   = new Router(); // instantiate the router class

  require('./users.routes.js')(router); // import/register user related routes
  require('./search.routes.js')(router); // import/register search related routes
  require('./help.routes.js')(router); // import/register help related routes
  require('./git.routes.js')(router); // import/register git related routes
  require('./about.routes.js')(router); // import/register about page related routes
  require('./contact.routes.js')(router); // import/register contact page related routes

  // return router for method chaining in main calling script for calling router.use()
  return router;
}
exports.RegisterRoutes = RegisterRoutes;