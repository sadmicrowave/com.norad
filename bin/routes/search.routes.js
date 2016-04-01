// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
    ,operations 	= require('../core.operations.js') 				// file holding main functionality for each web service operation type
    ;
// --------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW SEARCH ROUTES ************************************** //
// --------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ----- /:token/search
// ****************************************************************************************************************
router.route('/:token/search')
 .get(function(err,req,res){
   if ( err ) router.error( Error(err) );

   var  callback = function(err,db){
                    if ( err ) router.error( Error(err) );
                     var arr = [];
                     // iterate over each property of the operations list
                     for ( op in operations.WebServiceOperations ) {
                       // delete the function property to keep the function details private
                       delete operations.WebServiceOperations[ op ].function;
                       // push remaning object properties to array buffer
                       arr.push( JSON.stringify(operations.WebServiceOperations[ op ]) );
                     }
                     return router.submit(arr);
                   }
     ,ra					= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
     ;
 });

}
