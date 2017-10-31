// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	    = require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
  	,MongoClient 	   	= require('mongodb').MongoClient
    ;
// ------------------------------------------------------------------------------------------------------------- //
// ***************************************** REGISTER NEW LANDING PAGE ROUTES ********************************** //
// ------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ------ /landing
// ****************************************************************************************************************
router.route('/subscribe')
 .post(function(err,req,res){
		if ( err ) router.error( Error(err) );
	
	    // the text 'activate' was passed after user path element
	    var email = req.params && req.params.email !== undefined && req.params.email.length
                  ? req.params.email
                  : router.error( ErrorHandler('Invalid or Null Parameter Supplied for Subscribe API Argument.', 'Bad Request', 400) )
	        ;
	    // if statement used to prevent script from continuing if router returned result to user already
	    if ( ! email ) return false;
	
	    var callback  = function(err, db){
	                      if ( err ) router.error( Error(err) );
	                      db.collection('subscribers', function(err, coll){
	                          if (err) return router.error( Error(err) );
	                          coll.update({ 'email' : email
	                                       }
	                                       ,{ 'email'	: email
		                                     ,'created' : new Date().getTime()
	                                       }
	                                       ,{'upsert': true}
	                                       ,function(err, doc){
				                                if ( err ) return router.error( Error(err) );
												return router.submit( {'status': 200} );
	                          				});
	                      });
	                  }
	    //,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
	    ;
	
	    // Execute callback in MongoDB connection, return user record details if exists
	    MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
	      if (err) return router.error( Error(err) );
	
	       return callback(err, db);
	    });
	});




}
