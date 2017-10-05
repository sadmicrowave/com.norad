// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
    ,operations 	= require('../cores/operation.core.js')  // file holding main functionality for each web service operation type
    ;
// --------------------------------------------------------------------------------------------------------------- //
// ********************************* REGISTER NEW WORKDAY COUMMUNITY ROUTES ************************************** //
// --------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ----- /:token/search
// ****************************************************************************************************************
router.route('/:token/workdaycom/search')
 .get(function(err,req,res){
   if ( err ) router.error( Error(err) );

   var  callback = function(err,db){
                    if ( err ) router.error( Error(err) );
                     var arr = [];
                     // authenticate to community page
                     
                     
                     // search community page
                     
                     
                     
                     // provide results to user
                     
                     
                     
                     return router.submit(arr);
                   }
     ,ra 	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
     ;
 });

}
