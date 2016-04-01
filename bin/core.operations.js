/*
	Use this file to hold the various web service operations, denoted by their name as a json property key, with the following sub-object properties:

	description: [ define the web service function]
	returnType: [provide expected return type of variable from function]
	parameters: [provide expected parameters for function to operate and execute successfully, in array string format [<str varName>,<int varName>]]
	manual:	[provide man page results for function]
	function: [type function, this is the actual function which will be executed when function is called]

*/

var oWebServiceOperations = {

		'FUNCTIONLOOKUP': {  'description'	: 'Functionlookup receives a function name as type string and proceeds to find a matching function in the function repository then return the function syntax as type string. Function call utilization: function( <str funcName> ){...}.'
							,'returnType'	: 'string'
							,'parameters'	: ['<str funcName>']

							,'manual'	: 	[ 	 '__NAME__'
												,'functionlookup - lookup function syntax by name.'
												,'\n__SYNOPSIS__'
												,'http://localhost:[port]/[web service operation]?arg1=value1&arg2=value2[&...]'
												,'\n__DESCRIPTION__'
												,'Functionlookup receives a function name as type string and proceeds to find a matching function in the function repository then return the function syntax as type string. Function call utilization: function( <str funcName> ){...}.'
												,'\n__PARAMETERS__'
												,':param string - funcName: string containing the lookup function name.'
												,':return string - funcSytax: string containing all function syntax in text format.'
												,'\n__RETURN VALUES__'
												,'200 - OK: Standard response for successful HTTP requests.'
												,'204 - No Content: The server successfully processed the request and is not returning any content.'
												,'400 - Bad Request: The server cannot or will not process the request due to an apparent client error.'
												,'404 - Not Found: The requested resource could not be found.'
												,'401 - Unauthorized: Authentication is required and has failed or has not yet been provided.'
												,'501 - Not Implemented: The server either does not recognize the request method, or it lacks the ability to fulfill the request.'
											].join('\n')

							,'function'	: function( data ){
											 return 'True story';
										}

						}

}

exports.WebServiceOperations = oWebServiceOperations;
