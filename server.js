// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var EventEmitter 			= require('events').EventEmitter 			// core module for creating callable custom class events
	,https 					= require('https') 							// get the https module to start the tcp POST listener
	,http 					= require('http') 							// get the http module to start the tcp POST listener
	,querystring			= require('querystring')
	,fs 					= require('fs')
	,exec					= require('child_process').exec
	,util 					= require('util')
	,minimist				= require('minimist')					// library for parsing command line arguments
	,extend					= require('./bin/lib/extend.js')
	,checksum				= require('./bin/lib/checksum.js').checksum // get checksum functionality
	,format					= require('./bin/lib/format.js')			// get functionality for formatting strings
	,ErrorHandler			= require('./bin/lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
	,console				= require('./bin/lib/console.js').console 	// get the basic functionality for the console.log override
	,routes					= require('./bin/routes/controller.routes.js')
	;

// -------------------------------------------------------------------------------------------------------- //
// ********************************************** @@@ SCOPE @@@ ******************************************* //
// -------------------------------------------------------------------------------------------------------- //

// -- set static environment variables to be used throughout application
process.env.SHA_SECRET  = '%hR44#}De#K9_.i'; // server secret used in SHA hash to create new JWT and validate request attempts
process.env.WEBROOT		= __dirname + '/public'; // base directory name of the server.js script
process.env.GIT_REPO	= __dirname + '/bin/norad-api-repo.git'; // set the git repo holding all files for lookup
process.env.WIKI		= 'http://wiki.norad.com'; // set the url path for API wiki documentation
process.env.ADMIN		= 'corey.m.farmer@gmail.com'; // set the process admin email address

/* Build the main function of the script which holds all actions
	and variables for execution.  This function will be extended
	by the prototype properties, allowing for further function
	calls and custom executions.
*/
// -------------------------------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------- //



function Norad( options ) {
	// reinitialize the class if its broken or nonexistent
	if ( !(this instanceof Norad) )
		return new Norad( options );

	// set optoins to an object if not defined
	options = options || {};
	// set the class default options/parameters
	

	// override default parameters with passed params
	this.defaults = {   'port'		: options && options.secure ? 443 : 2222
						,'secure'	: true
						,'requests'	: 1000 // total daily request threshold from users, not to be exceeded daily
					}
	
	this.defaults.extend(options);
	
	/* This will iterate over each property in defaults and assign
	   them as properties to the object holder (this), with the
	   cooresponding values.
	*/
	for ( prop in this.defaults )
		this[prop] = this.defaults[prop];

	// -- set environment variables based on instance defined options
	process.env.THRESHOLD = this.requests;
	process.env.PORT	  = this.port;

	this.server = null;
}


// kill any other running instances of norad server
Norad.prototype.kill = function(pid) {
	// kill all other processes excluding the current process id, and one minus the current for the root instantiation of the process
	var  command = "kill -9 $(ps -aux | grep -v 'grep\\|{0}\\|{1}' | grep 'nodejs server.js' | awk {'print $2'})".format(pid, pid-1)
		,child   = exec(command)
		;

	return this;
}

// define class methods
Norad.prototype.start = function() {
	/* Everything within this start impelementation is dedicated to the server object with request and reponse types.
		Here we handle the request and response objects and their corresponding actions and events
	*/
	var  routeapi 	 = routes.RegisterRoutes(); // register all avaialble routes
	/*const ssloptions = {
	  'key': fs.readFileSync('./bin/ssl/emerus2017_key.pem'),
	  'cert': fs.readFileSync('./bin/ssl/emerus2017_cert.pem')
	}*/

	// establish the web server object
	this.server = http.createServer(function(request, response) {
		// every http request that hits this server will enter this callback and get executed
		var  headers 		= request.headers
			,method 		= request.method
			,url			= request.url
			,body 			= []	// initialize an empty array to hold the message body
			;

		request.on('data', function(data) {
				/*	The chunk emitted in each 'data' event is a Buffer. If you know it's going to be string data,
					the best thing to do is collect the data in an array, then at the 'end', concatenate and stringify it.
				*/
				body.push(data);
			 }).on('end', function() {

			 	try {
				 	// at this point, `body` has the entire request body stored in it as a string
				 	body = Buffer.concat(body);
				 		
				 	//console.log( request.connection.remoteAddress, request.headers, request.url );
					// execute the main router functionality and parse the http request, and determine which route to use and execute
					routeapi.use(request, response, body.toString());

				} catch (e) {
					// provide a status code if one is not already present in the error object
					e.statusCode = e.statusCode || 501;
					// throw an error to the response error event listener
					// provide an error and code back as a response
					routeapi.error(e);
				}

			}).on('error', function(e) {
				/* An error in the request stream presents itself by emitting an 'error' event on the stream.
				   If you don't have a listener for that event, the error will be thrown, which could crash your
				   Node.js program. You should therefore add an 'error' listener on your request streams, even
				   if you just log it and continue on your way.
				*/
			 	// provide an error and code back as a response
				routeapi.error(e);
			});


		// handle response events
		response.on('error', function(response_) {
			// (e) holds error object properties
			response.statusCode = response_.statusCode || 501;
			// submit results to response submit event handler
			response.emit('submit', response_);

		}).on('submit', function(response_){
			var statusCode = response_.statusCode || 200
			//if ( response_ instanceof Object ){
				,_response_ = !( response_ instanceof Object ) ? response_ : { 	 'headers'	: request.headers
																				,'url'		: request.url
																				,'method'	: request.method
																			}
																			.extend( response_ )
																			
			// Create event handler to end the response call and send data back to caller
			response.writeHead(statusCode
								,{	 'Content-Type'	: 'text/html; charset=UTF-8'
									,'Pragma'		: 'no-cache'
									,'ETag'			: checksum( JSON.stringify( _response_ || {} ), 'SHA256', 'base64' )
								}
							);
			
			// log response and reply with response
			//console.log( _response_ );
			
			// If the repsonse is an object, then it is already known that we are returning the data to a CLI type of implementation
			// so stringify the results to a json object for returned CLI readbility
			if ( _response_ instanceof Object )
				_response_ = JSON.stringify(_response_ || '');
				
			// write response back to caller through server object
			response.end( _response_ || '' ); //JSON.stringify( _response_ || '')
		});
	}).listen( this.port ); // chained to server object tell the server object to begin listening on defined port

	console.log( '[+] API Server Object Started :{0}'.format(this.port) );
}


// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ MAIN @@@ ********************************************* //
// -------------------------------------------------------------------------------------------------------- //

try {
	var argv 		= 	minimist(process.argv.slice(2))
		,f 			= 	function(err){
							console.error('An uncaught error occurred!');
							if ( err ) console.error(err.stack);
							// ensure server object is closed properly in the event of an error
							if ( n && n.server )  n.server.close();
							// exit program gracefully
							process.exit();
						}
		,options 	= {  'port'					: argv.p || argv.port || null
					 	,'secure'				: argv.s || argv.secure || null
						,'request_threshold' 	: argv.r || argv.requests || null
					}
		
		,n = Norad(options)
		;
		

	process.on('uncaughtException', function(err){
	  	f(err);
	})
	.on('SIGTERM', function(){
			f();
	});

	// Instantiate and start the listener
	n.kill(process.pid).start();

} catch (e) {
	f(e);
}
