// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	    = require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
	,fs					= require('fs')
	,HTML            	= require('../cores/view.core.js').HTML
    ;
// ------------------------------------------------------------------------------------------------------------- //
// ********************************************* REGISTER NEW HELP ROUTES ************************************** //
// ------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ------ /about
// ****************************************************************************************************************
router.route('/about')
 .get(function(err,req,res){ 
 	if ( err ) router.error( Error(err) );

    fs.readFile(__dirname + '/../views/about.blade.html', 'utf-8', function(err, data){
    	if (err) return router.error( Error(err) );
		var html 	= HTML(req, res)
			,page 	= html.render(err, data)
			;
		return router.submit( page, false ); //buffer.toString('utf-8', activationBlade)
		
	});

 });









}
