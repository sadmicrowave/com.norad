// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler		= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
  	,crypto 			= require('crypto')
  	,fs					= require('fs')
  	,MongoClient 	   	= require('mongodb').MongoClient
    ,ActivationEmail 	= require('../controllers/email.controller.js').ActivationEmail
    ,HTML            	= require('../cores/view.core.js').HTML
  	;
// ------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW USER ROUTES ************************************** //
// ------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// -------- /user
// ****************************************************************************************************************
router.route('/users')
	// -----------------------------
	// Create the user if not exists
	// -----------------------------
	.post(function(err,req,res){
		if ( err ) router.error( Error(err) );

  			 // ensure name is provided with registration parameters
		var  username = req.params && req.params.username !== undefined && req.params.username.length
						? req.params.username.toUpperCase()
						: router.error( ErrorHandler('Registration Name Not Provided.', 'Unauthorized', 401) )
  			// ensure email is provided with registration parameters
  			,useremail = req.params && req.params.email !== undefined && req.params.email.length
						? req.params.email.toLowerCase()
						: router.error( ErrorHandler('Registration Email Not Provided.', 'Unauthorized', 401) )
  			// ensure password is provided with registration parameters
  			,password	= req.params && req.params.password !== undefined && req.params.password.length
						? req.params.password
						: router.error( ErrorHandler('Registration Password Not Provided.', 'Unauthorized', 401) )
	  		,adminpass = req.params && req.params.adminpass !== undefined && req.params.adminpass.length
	                    ? req.params.adminpass
	                    : null
  			;
		// if statement used to prevent script from continuing if router returned result to user already
		if ( ! username || ! useremail || ! password ) return false;

		// create the json web token (JWT)
		var iat		    = new Date().getTime() 	// epoch time at which JWT was initiated
			,userpass 	= crypto.createHmac('SHA256', process.env.SHA_SECRET).update(password).digest('binary') // hash users password before storing
			,header 	= new Buffer(JSON.stringify({ 'typ': 'JWT'
	  											 	 ,'alg': 'HS256'
	  												})
	  								).toString('base64')
			,payload 	= new Buffer(JSON.stringify({'iss'	: 'sadmicrowave.com'
	  												,'name'	: username
	  												,'pass'	: userpass
	  												,'iat'	: iat
	  												,'email': useremail
  												})
								).toString('base64')
			,token	  	= crypto.createHmac('SHA256', process.env.SHA_SECRET).update( header + payload ).digest('hex') //.replace(/\//g, '+') // hash token header and payload to create unique token
			,activation_key = crypto.createHmac('SHA256', process.env.SHA_SECRET).update( payload ).digest('hex') //.replace(/\//g, '+') // hash payload to create unique activation key, different from authentication token
			//,jwt	    = '{0}.{1}.{2}'.format(header,payload,secret) // create entire jwt standard api token
			,callback 	= function(err, coll){
                if ( err ) router.error( Error(err) );
				coll.insert({ 	 'username'	: username
								,'email'	: useremail
								,'pass'		: userpass
								,'jwt'		: token
								,'header'	: header
								,'payload'	: payload
                                ,'total_req': 0
                                ,'threshold_req': 0
                                ,'threshold_start_time': 0
                                ,'ak'     	: activation_key
                                ,'activated': adminpass == process.env.SHA_SECRET ? true : false
                                ,'adm'    	: adminpass == process.env.SHA_SECRET ? true : false
                                ,'iat'		: iat
								,'created'	: iat
                                ,'modified'	: iat
							}
							,function(err, res){
								if ( err.code == 11000 ) return router.error( ErrorHandler('User already exists.', 'Conflict', 409) )
								if ( err ) return router.error( Error(err) );
				              	var r = {'id': res.ops[0].username
					              		,'email': res.ops[0].email
				              			}
				              			.extend(
				              				adminpass == process.env.SHA_SECRET
							                    ? {'apitoken': token}
							                    : {'Response':'Your activation code has been emailed to the address used in registration. Please check your email and follow the instructions for account activation.'}
												)
					                ,scallback = function(){ return router.submit(r) }
									// send the activation email to the user
								    ,res = ActivationEmail(useremail, activation_key, scallback, router)
								    ;
								if ( res instanceof Error ) router.error( Error(err) );
							}
				);
			}
			;

		// verify that user doesn't already exist.  Take token api key and cross reference in user table
		MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
			if (err) return router.error( Error(err) );
			db.collection('users', function(err, coll){
				if (err) return router.error( Error(err) );
				return callback(err, coll);
			});
	  	});

	})
	// -----------------------------
	// Activate User
	// -----------------------------
	.get(function(err,req,res){
		if ( err ) router.error( Error(err) );
	
		console.log( req.params );
	    // the text 'activate' was passed after user path element
	    var ak = req.params && req.params.ak !== undefined && req.params.ak.length
                  ? req.params.ak
                  : router.error( ErrorHandler('No Function Path for Supplied API Argument.', 'Bad Request', 400) )
	        ;
	    // if statement used to prevent script from continuing if router returned result to user already
	    if ( ! ak ) return false;
	
	    var callback  = function(err, db){
	                      if ( err ) router.error( Error(err) );
	                      db.collection('users', function(err, coll){
	                          if (err) return router.error( Error(err) );
	                          coll.findOneAndUpdate({ 'ak'       : ak
	                                           	//	,'activated' : false
	                                        }
	                                        ,{ $set  : { 'activated': true
	                                                    ,'modified' : new Date().getTime()
	                                                  }
	                                        }, function(err, doc){
				                                if ( err ) return router.error( Error(err) );
				                                if ( doc.value == null ) return router.error( ErrorHandler('User Does Not Exist!', 'Bad Request', 400) );
			                                	fs.readFile(__dirname + '/../views/activation.blade.html', 'utf-8', function(err, data){
				                                	if (err) return router.error( Error(err) );
													req.token = doc.value.jwt;
													var html 	= HTML(req, res)
														,page 	= html.render(err, data)
														;
													return router.submit( page, false ); //buffer.toString('utf-8', activationBlade)
													
												});	
	                          				}
	                          				);
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

	




// ****************************************************************************************************************
// -------- /user/:option
// ****************************************************************************************************************


// ****************************************************************************************************************
// -------- /:token/user
// ****************************************************************************************************************
router.route('/:token/users')
	// -------------------------
	// Remove the user if exists
	// -------------------------
	.delete(function(err,req,res){
		if ( err ) router.error( Error(err) );
		var password	= req.params && req.params.password !== undefined && req.params.password.length
							? req.params.password
							: router.error( ErrorHandler('Registration Password Not Provided.', 'Unauthorized', 401) )
			,querySet	= {'jwt': req.token, 'pass': password}
                  
			,callback 	= function(err, db){
                if ( err ) router.error( Error(err) );
				db.collection('users', function(err, coll){
						if (err) return router.error( Error(err) );
						coll.findOneAndDelete(querySet, function(err, res){
								console.log( res );
								if ( err ) return router.error( Error(err) );	 
								return router.submit( {'_id': res.id });
							}
			 			);
				});
			}
			,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
			;
	})
	// -----------------------------
	// Get the user record details
	// -----------------------------
	.get(function(err,req,res){
	  	if ( err ) router.error( Error(err) );
		var callback  = function(err, db){
	            if ( err ) router.error( Error(err) );
				db.collection('users', function(err, coll){
					if (err) return router.error( Error(err) );
					// find the user document based on the jwt query, excluding the projection criteria fields specified below
					coll.findOne({'jwt':req.token}, {'pass':0, 'ak':0, 'payload':0, 'header':0, '_id':0}, function(err,doc){
						if ( err ) return router.error( Error(err) );
						if ( doc ) return router.submit( {'body': doc });
						
						return router.error( ErrorHandler('User Does Not Exist!', 'Bad Request', 400) );
					});
				});
			}
			,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
			;
  	})
	// -------------------------
	// Update the user if exists
	// -------------------------
	.put(function(err,req,res){
		if ( err ) router.error( Error(err) );

		var updateSet	= {}
                  	// ensure password is provided with registration parameters
					.extend(	req.params && req.params.password !== undefined && req.params.password.length
								? { 'pass': crypto.createHmac('SHA256', process.env.SHA_SECRET).update(req.params.password).digest('base64') }
								: null	)
			          // ensure name is provided with registration parameters
					.extend(	req.params && req.params.username !== undefined && req.params.username.length
								? { 'username': req.params.username.toUpperCase() }
								: null	)
			          // ensure email is provided with registration parameters
					.extend(	req.params && req.params.email !== undefined && req.params.email.length
								? { 'email': req.params.email.toLowerCase() }
								: null	)
			,callback  = function(err, db){
                if ( err ) router.error( Error(err) );
				db.collection('users', function(err, coll){
						if (err) return router.error( Error(err) );
						if (!Object.keys(updateSet).length) return router.error(  ErrorHandler('No Values Provided to Update!', 'Bad Request', 400) )

                        // if we made it this far it is because there are values present in updateSet to update the record
                        updateSet.extend({ 'modified': new Date().getTime() });

						coll.updateOne({'jwt': req.token}, { $set: updateSet }, function(err){
							if ( err ) return router.error( Error(err) );
							return router.submit( 'User Successfully Updated!' );
						});
				});
			}
			,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
			;
	});


/*
// ****************************************************************************************************************
// -------- /:token/user/renew
// ****************************************************************************************************************
router.route('/:token/users/renew')
	// -------------------------
	// Renew the user's json web token if exists
	// -------------------------
	.put(function(err,req,res){
			if ( err ) router.error( Error(err) );
	         
			var callback  = function(err, db){
					if ( err ) router.error( Error(err) );
					db.collection('users', function(err, coll){
						if (err) return router.error( Error(err) );
	
	                   	coll.findOne({'jwt':req.token}, function(err,doc){
							if ( err ) return router.error( Error(err) );
							else
							if ( doc ) {
								var iat		    = new Date().getTime() 	// epoch time at which JWT was initiated
					    			,header 	= new Buffer(JSON.stringify({ 'typ': 'JWT'
																		 	 ,'alg': 'HS256'
																			})
													).toString('base64')
									,payload 	= new Buffer(JSON.stringify({ 'iss'		: 'sadmicrowave.com'
																			 ,'username': doc.username
																			 ,'pass'	: doc.pass
																			 ,'iat'		: iat
																			 ,'email'	: doc.email
																			})
													).toString('base64')
									,token	  	= crypto.createHmac('SHA256', process.env.SHA_SECRET).update( header + payload ).digest('hex') //.replace(/\//g, '+') // hash token header and payload to create unique token
									,updateSet	= { 'jwt': token }
													.extend({ 'modified': new Date().getTime() });
									;
					
					            // ensure updateSet has a token is provided with registration parameters
								if (!Object.keys(updateSet).length) return router.error(  ErrorHandler('No Values Provided to Update!', 'Bad Request', 400) )

								coll.updateOne({'jwt': req.token}, { $set: updateSet }, function(err){
										if ( err ) return router.error( Error(err) );
										return router.submit( {'body': 'User Successfully Activated!', 'apitoken': token} );
								});
							}
						});
					});
				}
				,ra	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
				;

	});
*/



}
