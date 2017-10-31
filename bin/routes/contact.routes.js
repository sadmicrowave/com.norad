// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	    = require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
	,fs					= require('fs')
	,ContactEmail 		= require('../controllers/email.controller.js').ContactEmail
	,HTML            	= require('../cores/view.core.js').HTML
	,MongoClient 	   	= require('mongodb').MongoClient

    ;
// ------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW HELP ROUTES ************************************** //
// ------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ------ /contact
// ****************************************************************************************************************
router.route('/contact')
	// -----------------------------
	// Return the contact page
	// -----------------------------
	/*.get(function(err,req,res){ 
	 	if ( err ) router.error( Error(err) );
	
	    fs.readFile(__dirname + '/../views/contact.blade.html', 'utf-8', function(err, data){
	    	if (err) return router.error( Error(err) );
			var html 	= HTML(req, res)
				,page 	= html.render(err, data)
				;
			return router.submit( page, false ); //buffer.toString('utf-8', activationBlade)
			
		});
	
	 })*/
	 // -----------------------------
	 // Create and send new contact ticket
	 // -----------------------------
	 .post(function(err,req,res){
		if ( err ) router.error( Error(err) );
		
			 // ensure name is provided with registration parameters
		var  useremail = req.params && req.params.email !== undefined && req.params.email.length
						? req.params.email.toLowerCase()
						: router.error( ErrorHandler('Contact Email Not Provided.', 'Unauthorized', 401) )
  			// ensure message is included in contact form
  			,message	= req.params && req.params.message !== undefined && req.params.message.length
						? req.params.message
						: router.error( ErrorHandler('Contact Message Not Provided.', 'Unauthorized', 401) )
			// ensure name is include in the contact form
			,name		= req.params && req.params.name !== undefined && req.params.name.length
						? req.params.name
						: router.error( ErrorHandler('Contact Name Not Provided.', 'Unauthorized', 401) )
			,r = {'email': useremail}
			,scallback 	= function(){ return router.submit(r) }
			,dt			= new Date().getTime()
  			;
		// if statement used to prevent script from continuing if router returned result to user already
		if ( ! message || ! useremail ) return false;
		
		// issue insert call to access database to keep track of all user access attempts on server
		MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
			if (err) return router.error( Error(err) );
	
			db.collection('contact', function(err, coll){
				if ( err ) return router.error( Error(err) );
				coll.insert({  	 'url'					: 	req.url
								,'remote-address'		: 	req.connection.remoteAddress
								,'user-agent'			:	req.headers['user-agent']
								,'method'				:	req.method
								,'bytesRead'			:	req.client['bytesRead']
								,'message'				: 	message
								,'sumitter-name'		:   name
								,'submitter-email'		:	useremail
								,'created'				:	dt
							}, 
							function(err){
								if (err) return router.error( Error(err) );
				
								// send the activation email to the user
							    ContactEmail(useremail, message, scallback, router);
							});
			});
		});
		
	 });









}
