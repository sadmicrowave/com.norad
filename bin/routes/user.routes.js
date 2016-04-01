// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
  	,crypto 			= require('crypto')
  	,MongoClient 	= require('mongodb').MongoClient
    //,nodemailer   = require('nodemailer')
  	;
// ------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW USER ROUTES ************************************** //
// ------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// -------- /user
// ****************************************************************************************************************
router.route('/user')
	// -----------------------------
	// Create the user if not exists
	// -----------------------------
	.post(function(err,req,res){
		if ( err ) router.error( Error(err) );

			 // ensure name is provided with registration parameters
		var  username = req.data && req.data.name !== undefined && req.data.name.length
      							? req.data.name.toUpperCase()
      							: router.error( ErrorHandler('Registration Name Not Provided.', 'Unauthorized', 401) )
  			// ensure email is provided with registration parameters
  			,useremail = req.data && req.data.email !== undefined && req.data.email.length
      							? req.data.email.toLowerCase()
      							: router.error( ErrorHandler('Registration Email Not Provided.', 'Unauthorized', 401) )
  			// ensure password is provided with registration parameters
  			,password	= req.data && req.data.password !== undefined && req.data.password.length
      							? req.data.password
      							: router.error( ErrorHandler('Registration Password Not Provided.', 'Unauthorized', 401) )
        ,adminpass = req.data && req.data.adminpassword !== undefined && req.data.adminpassword.length
                      ? req.data.adminpassword
                      : null
  			;
			// if statement used to prevent script from continuing if router returned result to user already
			if ( ! username || ! useremail || ! password ) return false;

			// create the json web token (JWT)
			var iat		    = new Date().getTime() 	// epoch time at which JWT was initiated
    			,userpass = crypto.createHmac('SHA256', process.env.SHA_SECRET).update(password).digest('base64') // hash users password before storing
    			,header 	= new Buffer(JSON.stringify(
      												{ 'typ': 'JWT'
      											 	 ,'alg': 'HS256'
      												}
    												)
    								).toString('base64')
    			,payload = new Buffer(JSON.stringify(
      												{ 'iss'		: 'sadmicrowave.com'
      												 ,'name'	: username
      												 ,'pass'	: userpass
      												 ,'iat'		: iat
      												 ,'email'	: useremail
      												}
    												)
    								).toString('base64')
    			,token	  = crypto.createHmac('SHA256', process.env.SHA_SECRET).update( header + payload ).digest('base64').replace(/\//g, '+') // hash token header and payload to create unique token
          ,activation_key = crypto.createHmac('SHA256', process.env.SHA_SECRET).update( payload ).digest('base64').replace(/\//g, '+') // hash payload to create unique activation key, different from authentication token
    			//,jwt	    = '{0}.{1}.{2}'.format(header,payload,secret) // create entire jwt standard api token
    			,callback = function(err, coll){
                          if ( err ) router.error( Error(err) );
    											coll.insert({  'name'		: username
        																,'email'	: useremail
        																,'pass'		: userpass
        																,'jwt'		: token
        																,'header'	: header
        																,'payload': payload
                                        ,'total_req': 0
                                        ,'threshold_req': 0
                                        ,'threshold_start_time': 0
                                        ,'ak'     : activation_key
                                        ,'activated': adminpass == process.env.SHA_SECRET ? true : false
                                        ,'adm'    : adminpass == process.env.SHA_SECRET ? true : false
                                        ,'iat'		: iat
        																,'created': iat
                                        ,'modified': iat

        															}, function(err){
        																		if ( err ) {
                                              return router.error( Error(err) );
        																		} else {
                                              var r = adminpass == process.env.SHA_SECRET
                                                    ? {'apitoken': token}
                                                    : 'Your activation code has been emailed to the address used in registration. Please check your email and follow the instructions for account activation.'
                                                  ;
                                              return router.submit( r );
                                            }
        														  }
    										 );
    									}
    			;

			// verify that user doesn't already exist.  Take token api key and cross reference in user table
			MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
				if (err) return router.error( Error(err) );

  				db.collection('users', function(err, coll){
  					if (err) return router.error( Error(err) );

    					coll.findOne({'email': useremail}, function(err,doc){
    						if ( doc ) return router.error(ErrorHandler('User Already Exists.', 'Bad Request', 400));

    						//return router.submit('user does not exist');
    						return callback(err, coll);
    					});
  				});
		  });

	})
  // -----------------------------
	// Get the user record details
	// -----------------------------
  .get(function(err,req,res){
      if ( err ) router.error( Error(err) );

          // ensure email is provided with registration parameters
      var useremail = req.data && req.data.email !== undefined && req.data.email.length
                      ? req.data.email.toLowerCase()
                      : router.error(  ErrorHandler('Account Email Not Provided.', 'Unauthorized', 401) )
          // ensure password is provided with registration parameters
         ,password	= req.data && req.data.password !== undefined && req.data.password.length
                      ? req.data.password
                      : router.error(  ErrorHandler('Account Password Not Provided.', 'Unauthorized', 401) )
          ;

      // if statement used to prevent script from continuing if router returned result to user already
      if ( ! password || ! useremail ) return false;

      var userpass   = crypto.createHmac('SHA256', process.env.SHA_SECRET).update(password).digest('base64') // hash users password before matching
					,callback  = function(err, db){
                            if ( err ) router.error( Error(err) );
														db.collection('users', function(err, coll){
																if (err) return router.error( Error(err) );
																coll.findOne({'pass':userpass, 'email':useremail}, function(err,doc){
																					if ( err ) return router.error( Error(err) );
																					else
                                            if ( doc ) return router.submit( {'body': doc} );
                                            else return router.error( ErrorHandler('User Does Not Exist!', 'Bad Request', 400) );
																	  }
													 			);
														});
												}
					;

      // Execute callback in MongoDB connection, return user record details if exists
			MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
				if (err) return router.error( Error(err) );

          return callback(err, db);
		  });

  });




// ****************************************************************************************************************
// -------- /user/:option
// ****************************************************************************************************************
router.route('/user/:option')
// -----------------------------
// Create the user if not exists
// -----------------------------
  .get(function(err,req,res){
  	if ( err ) router.error( Error(err) );

    // the text 'activate' was passed after user path element
    var option = req.data && req.data.option !== undefined && req.data.option.length
                      ? req.data.option
                      : router.error( ErrorHandler('No Function Path for Supplied API Argument.', 'Bad Request', 400) )

    // if statement used to prevent script from continuing if router returned result to user already
    if ( ! option ) return false;

    var callback  = function(err, db){
                      if ( err ) router.error( Error(err) );

                      db.collection('users', function(err, coll){
                          if (err) return router.error( Error(err) );

                          coll.updateOne({ 'ak'         : option
                                           ,'activated' : false
                                        }
                                        ,{ $set  : { 'activated': true
                                                    ,'modified' : new Date().getTime()
                                                  }
                                        }, function(err){
                                if ( err ) return router.error( Error(err) );
                                else return router.submit( {'body': 'User Successfully Activated!', 'apitoken': req.token} );
                          });
                      });
                  }
    //,ra					= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
    ;

  });


// ****************************************************************************************************************
// -------- /:token/user
// ****************************************************************************************************************
router.route('/:token/user')
	// -------------------------
	// Remove the user if exists
	// -------------------------
	.delete(function(err,req,res){
			if ( err ) router.error( Error(err) );

      // ensure password is provided with registration parameters
			var password	= 	req.data && req.data.password !== undefined && req.data.password.length
												? req.data.password
												: router.error(  ErrorHandler('Account Password Not Provided.', 'Unauthorized', 401) )
										;
			// if statement used to prevent script from continuing if router returned result to user already
			if ( ! password ) return false;
			var userpass    = crypto.createHmac('SHA256', process.env.SHA_SECRET).update(password).digest('base64') // hash users password before matching
					,callback 	= function(err, db){
                            if ( err ) router.error( Error(err) );
														db.collection('users', function(err, coll){
																if (err) return router.error( Error(err) );
																coll.remove({'jwt': req.token, 'pass':userpass}, function(err){
																					if ( err ) return router.error( Error(err) );
																					else return router.submit( 'User Successfully Removed!' );
																	  }
													 			);
														});
												}
					,ra					= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
					;

	})
	// -------------------------
	// Update the user if exists
	// -------------------------
	.put(function(err,req,res){
		if ( err ) router.error( Error(err) );

		var updateSet	= {}
                  // ensure password is provided with registration parameters
									.extend(
														req.data && req.data.password !== undefined && req.data.password.length
														? { 'pass': crypto.createHmac('SHA256', process.env.SHA_SECRET).update(req.data.password).digest('base64') }
														: null
													)
				          // ensure name is provided with registration parameters
									.extend(
														req.data && req.data.name !== undefined && req.data.name.length
														? { 'name': req.data.name.toUpperCase() }
														: null
												)
				          // ensure email is provided with registration parameters
									.extend(
														req.data && req.data.email !== undefined && req.data.email.length
														? { 'email': req.data.email.toLowerCase() }
														: null
													)
				,callback  = function(err, db){
                          if ( err ) router.error( Error(err) );
													db.collection('users', function(err, coll){
															if (err) return router.error( Error(err) );
															if (!Object.keys(updateSet).length) return router.error(  ErrorHandler('No Values Provided to Update!', 'Bad Request', 400) )

                              // if we made it this far it is because there are values present in updateSet to update the record
                              updateSet.extend({ 'modified': new Date().getTime() });

															coll.updateOne({'jwt': req.token}, { $set: updateSet }, function(err){
																		if ( err ) return router.error( Error(err) );
																		else return router.submit( 'User Successfully Updated!' );
															});
													});
											}
				,ra					= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
				;
	});

}
