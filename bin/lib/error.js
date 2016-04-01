// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var format	= require('./format.js')			// get functionality for formatting strings
		;

// create custom error handler that handles error messages and error codes

function ErrorHandler(message,name,code){
	// set new error object properties
	this.name 		= name || 'NotImplementedError';
	this.message 	=  message || '';
	this.statusCode = code || 501;
	this.stack 		= new Error().stack;
	if ( code == 400 ) // Bad Request Error Type
		this.ins = 'See man/wiki pages {0} corresponding to Web Service Operation implementation criteria.'.format(process.env.WIKI);
	return this;
}

exports.ErrorHandler = ErrorHandler;
