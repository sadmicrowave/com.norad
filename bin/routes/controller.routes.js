// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  Router	= require('../lib/router.js').router
     ;

// -------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW ROUTES ************************************** //
// -------------------------------------------------------------------------------------------------------- //
var RegisterRoutes = function(){
  var router   = new Router(); // instantiate the router class

  require('./user.routes.js')(router); // import/register user related routes
  require('./search.routes.js')(router); // import/register search related routes
  require('./help.routes.js')(router); // import/register help related routes
  require('./git.routes.js')(router); // import/register git related routes


  // return router for method chaining in main calling script for calling router.use()
  return router;
}
exports.RegisterRoutes = RegisterRoutes;
