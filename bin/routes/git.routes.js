// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
    ,operations 	= require('../cores/operation.core.js') // file holding main functionality for each web service operation type
    ,fs           	= require('fs')
    ,simpleGit    	= require('simple-git')(process.env.GIT_REPO)
    ;
// --------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW GIT ROUTES ***************************************** //
// --------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ----- /:token/pull
// ****************************************************************************************************************
// Used for git server to issue Web Hook to API server on Push triggers
router.route('/:token/pull')
 .post(function(err,req,res){
   if ( err ) router.error( Error(err) );

   var callback = function(err,db){
                      if ( err ) router.error( Error(err) );
                      // perform the git pull on the git repository
                      simpleGit.pull('origin','master',function(err, update){
                          if ( err ) router.error( Error(err) );
                          return router.submit( update.summary );
                      });

                   }
      ,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
     ;
 });


// ****************************************************************************************************************
// ----- /:token/getFunctionByName
// ****************************************************************************************************************
router.route('/:token/getFunctionByName/:option')
 .get(function(err,req,res){
   if ( err ) router.error( Error(err) );

   var functionName = req.data && req.data.option !== undefined && req.data.option.length
                       ? req.data.option
                       : router.error( ErrorHandler('No Function Name Provided for Lookup.', 'Bad Request', 400) )

   // if statement used to prevent script from continuing if router returned result to user already
   if ( ! functionName ) return false;

   var callback = function(err,db){
                       if ( err ) router.error( Error(err) );
                       fs.readFile( process.env.GIT_REPO + '/' + functionName, 'UTF-8', function(err,data){
                           if ( err ) router.error( Error(err) );
                           else return router.submit( data );
                       });
                   }
     ,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
     ;
 });






}
