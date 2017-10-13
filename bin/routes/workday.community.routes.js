// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  ErrorHandler	= require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
    ,operations 	= require('../cores/operation.core.js')  // file holding main functionality for each web service operation type
	,request		= require('request') // get the request module to perform web calls
    ;
// --------------------------------------------------------------------------------------------------------------- //
// ********************************* REGISTER NEW WORKDAY COUMMUNITY ROUTES ************************************** //
// --------------------------------------------------------------------------------------------------------------- //
module.exports = function(router) {

// ****************************************************************************************************************
// ----- /:token/search
// ****************************************************************************************************************
router.route('/:token/workday/docs/search')
 .get(function(err,req,res){
   if ( err ) router.error( Error(err) );

   var   userAgent 	= 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0'
   		,site		= 'https://www.icloud.com'
   		,callback = function(err,db){
                    if ( err ) router.error( Error(err) );
					var arr = [];
					
					// authenticate to community page
					var j = request.jar();
				    var request = request.defaults({ 'jar' : j }) //it will make the session default for every request

				    request({
				         'url':site
				        ,'headers': {'User-Agent': userAgent
				        			}
				        ,'method':"POST"
				        ,'form':{UNENTRY:"username",PWENTRY:"password"}
				    },
				    function(err,response,body){
				        if ( err ) router.error( Error(err) );
				        //Do your logic here or even another request like
				        
				        console.log( body )
				    });
                     
                     
                     // search community page
                     
                     
                     
                     // provide results to user
                     
                     
                     
                     return router.submit(arr);
                   }
     ,ra 	= router.authenticate(req.token, callback) // authenticate token, router.authenticate will throw error if not authenticated
     ;
 });

}
