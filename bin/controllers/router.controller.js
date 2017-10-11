// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  urlapi 		= require('url')
	,util 			= require('util')
	,extend			= require('../lib/extend.js')
	,querystring	= require('querystring')
	,MongoClient 	= require('mongodb').MongoClient
    ,Server 		= require('mongodb').Server
	,ErrorHandler	= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
	,format			= require('../lib/format.js')	// get functionality for formatting strings
	;

function RouteHandler(){
	if ( !(this instanceof RouteHandler) )
  		return new RouteHandler();
}
// ****************************************
// -------- Wrapper for GET method handling
// ****************************************
RouteHandler.prototype.get = function(callback) {
	var err = null;
	// only execute callback if method is GET
	if ( callback instanceof Function )
    	// execute the passed callback from the calling script
    	this.get = function(req, res){ return callback(err, req, res) };
	// return this for function chaining
	return this;
}
// ****************************************
// ------- Wrapper for POST method handling
// ****************************************
RouteHandler.prototype.post = function(callback) {
	var err = null;
	// only execute callback if method is POST
	if ( callback instanceof Function )
   	 	// execute the passed callback from the calling script
    	this.post = function(req, res){ return callback(err, req, res) };
	// return this for function chaining
	return this;
}
// ****************************************
// -------- Wrapper for PUT method handling
// ****************************************
RouteHandler.prototype.put = function(callback) {
	var err = null;
	// only execute callback if method is PUT
	if ( callback instanceof Function )
    	// execute the passed callback from the calling script
			this.put = function(req, res){ return callback(err, req, res) };
	// return this for function chaining
	return this;
}
// ****************************************
// ------ Wrapper for PATCH method handling
// ****************************************
RouteHandler.prototype.patch = function(callback ) {
	var err = null;
	// only execute callback if method is PATCH
	if ( callback instanceof Function )
    	// execute the passed callback from the calling script
			this.patch = function(req, res){ return callback(err, req, res) };
	// return this for function chaining
	return this;
}
// ****************************************
// ----- Wrapper for DELETE method handling
// ****************************************
RouteHandler.prototype.delete = function(callback ) {
	var err = null;
	// only execute callback if method is DELETE
	if ( callback instanceof Function )
    	// execute the passed callback from the calling script
			this.delete = function(req, res){ return callback(err, req, res) };
	// return this for function chaining
	return this;
}


// define the main router function to handle all routes passed and parse them accordingly
function Router() {
	// reinitialize the class if its broken or nonexistent
	if ( !(this instanceof Router) )
		return new Router();
	// setup the empty routes object to hold all registered routes later
	this.routes = {};
}
// register new routes
Router.prototype.route = function(url){
  var r = new RouteHandler(); // instanciate a new routehandler for each newly registered route
  r.url = url; // get the url passed to the route handler
  this.routes[url] = r; // add the routehandler instance to an object containing all routes

  return r; // return the routehandler instance instead of this to start chaining route handler instance prototype functions
}

// ****************************************
// -------- Authenticate users based on jwt
// ****************************************
Router.prototype.authenticate = function(jwt, callback){
	var router  = this
		//,jwt	= t.replace('jwt:', '')
		,reg 	= new RegExp(/^[A-Za-z0-9]{64}$/) //new RegExp(/^[A-Za-z0-9+=\\]{43}[=]$/)
		,match	= reg.test(jwt)
		;

	if ( !match ) // if the API JWT token does not match the regex standard for 64 character (SHA256) hash
		return router.error(ErrorHandler('Not Authenticated with API Token.', 'Unauthorized', 401));

	MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
		if (err) return router.error( Error(err) );

		db.collection('users', function(err, coll){
				if (err) return router.error( Error(err) );

				coll.findOne({'jwt': jwt, 'activated':true}, function(err, doc){
					if (err) return router.error( Error(err) );
					// throw an error if no item is found
					if ( ! doc ) {
						return router.error(ErrorHandler('Not Authenticated with API Token.', 'Unauthorized', 401));
					} else {
							// increase counter and today counter
							var dt			= new Date().getTime()
								,updateSet 	= { 'total_req'		: isNaN(doc.total_req) ? 0 : doc.total_req + 1 //increment total request counter by one
					 							 ,'modified'	: dt // set modified date to current datetime stamp
												}
												.extend( parseFloat(((dt - doc.threshold_start_time)/1000/60).toFixed(2)) > 1442 // if difference between current timestamp and start timestamp in minutes is greater than 24 hours
													? {   'threshold_start_time' 	: dt // reset start time for threshold counter (since we are now outside the 24 hour window)
														 ,'threshold_req' 			:  0 // reset the threshold counter
													  }
													: {   'threshold_req' 	:  isNaN(doc.threshold_req) ? 1 : doc.threshold_req + 1 // increment current day request counter
														}
												)
								 ;

							// if daily threshold is exceeded, return error to user
							if ( updateSet.threshold_req >= process.env.THRESHOLD )
								return router.error(ErrorHandler('Too Many Requests.', 'Too Many Requests', 429));
							else
								// if we made it this far it is because there are values present in updateSet to update the record
								coll.updateOne({'jwt': jwt}, { $set: updateSet }, function(err){
									if ( err ) return router.error( Error(err) );
									else
										// execute user passed callback after authenticate and request increment queries are performed
										if ( callback instanceof Function ) return callback(err, db);
								});
					}
				});
		});
	});

}
// ****************************************
// -------- Error write to user
// ****************************************
Router.prototype.error = function(e){
	// set response object to return to caller, initalized with basic properties to return
	var _response_ = {'body':{ 	 'error'		: e.message
								,'statusCode'	: e.statusCode
								,'type'			: e.name
								,'ins'			: e.ins
								,'stack'		: e.stack
							}
					}
	this.res.emit('error', _response_);
	return false;
}
// ****************************************
// -------- Submit/success write to user
// ****************************************
Router.prototype.submit = function(response_, cli){
	// set response object to return to caller, initalized with basic properties to return
	var _response_  = {}
		,cli		= this.req.cli 
		//,cli		= cli === undefined ? true : cli
		;

	// add response property values retrieved and resulted in try block
	//if ( !cli || ( typeof response_ === 'object' && !(util.isArray(response_)) ) )
	if ( !cli )
		_response_ = response_;
	else
		_response_['body'] = response_;
	
	this.res.emit('submit', _response_);
	return false;
}




// call the router functionality and parse the url to determine which registered route to execute
Router.prototype.use = function(req, res, body){
	this.res = res;
	this.req = req;
	req.router = this;
	var $this	= this
		,dt		= new Date().getTime()
		,reg	= new RegExp(/^mozilla/gi)
		;
	
	
	console.log( urlapi.parse(req.url), querystring.parse(urlapi.parse(req.url).query ) );
	// set the command line interface property to determine if the results should be handled as a json object, or an html view
	this.req.cli	= req.headers['user-agent'].match(reg) ? false : true;
	// issue insert call to access database to keep track of all user access attempts on server
	MongoClient.connect('mongodb://localhost:27017/norad', function(err, db){
		if (err) return router.error( Error(err) );

		db.collection('access', function(err, coll){
			if ( err ) return router.error( Error(err) );
			coll.insert({  	 'url'					: 	req.url
							,'remote-address'		: 	req.connection.remoteAddress
							,'user-agent'			:	req.headers['user-agent']
							,'method'				:	req.method
							,'bytesRead'			:	req.client['bytesRead']
							,'created'				:	dt
						}, 
						function(err){
							if (err) return router.error( Error(err) );
							
							// this is where we actually attempt to perform the routing operation for the request
							var  	 url 		= urlapi.parse(req.url)
									,params		= querystring.parse(url.query)
									,method		= req.method
									,pathparts 	= url.pathname.split('/')
									,reg 		= new RegExp(/^[A-Za-z0-9]{64}$/) //new RegExp(/^[A-Za-z0-9+=\\]{43}[=]$/)			
									,match		= params.hasOwnProperty('jwt') ? reg.test(params.jwt) : null
									,token		= match ? params.jwt : null
									//,token		= pathparts[1].indexOf('jwt:') > -1 ? pathparts[1].replace('jwt:', '') : null
									//,route		= token ? pathparts[2] : pathparts[1]
									,route		= pathparts[1] // [0] will always be an empty section since the .split('/') puts nothing in position 0
									,id			= pathparts[2] ? pathparts[2] : null
									//,path		= '/' + ( token ? ':token/' + route : route ) + ( option ? '/:option' : '' )
									,path		= '/' + ( token ? ':token/' + route : route ) + ( id ? '/:id' : '' )
									
									// ensure routeObj is valid, else throw an error
									,routeObj 	= $this.routes.hasOwnProperty(path) && $this.routes[path].hasOwnProperty(method.toLowerCase()) ? $this.routes[path] : $this.error( ErrorHandler('Route [' + path + '] Not Defined for Provided Web Service Operation.', 'Bad Request', 400) )
									;
																
							req.extend({'token': token, 'params': params.length ? params : querystring.parse(decodeURIComponent( body )) }); //, 'data': body.length ? querystring.parse(decodeURIComponent( body )) : { 'option': option } })
						
						    if ( routeObj )
								return routeObj[method.toLowerCase()](req,res);
						}
					);			
		});
	});

}
exports.router = Router;
