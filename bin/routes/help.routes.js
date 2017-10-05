// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	          = require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
    ,WebServiceOperations 	= require('../cores/operation.core.js').WebServiceOperations 	// file holding main functionality for each web service operation type

    ;
// ------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW HELP ROUTES ************************************** //
// ------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ------ /:token/help/:option
// ****************************************************************************************************************
router.route('/:token/help/:option')
 .get(function(err,req,res){
   if ( err ) router.error( Error(err) );

   var functionName = req.data && req.data.option !== undefined && req.data.option.length
                         ? req.data.option
                         : router.error( ErrorHandler('No Function Name Provided for Lookup.', 'Bad Request', 400) )
      ;

  // if statement used to prevent script from continuing if router returned result to user already
  if ( ! functionName ) return false;

  var callback  = function(err,db){
                      if ( err ) router.error( Error(err) );
                      var  el	= WebServiceOperations.hasOwnProperty(functionName.toUpperCase())
                                    ? WebServiceOperations[functionName.toUpperCase()]
                                    : router.error( ErrorHandler('No Web Service Operation Named `{0}`.'.format(functionName.toUpperCase()), 'Not Found', 404) )
                           ;

                        if ( el ) return router.submit( el.manual );
                     }

       ,ra				= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
       ;
 });









}
