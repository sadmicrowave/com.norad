// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  format	    = require('../lib/format.js')	// get functionality for formatting strings
    ,fs 		= require('fs')
    ;


function importHTML ( file, callback ) {
  if ( file ){
    fs.readFile(file, 'UTF-8', function(err, src){
        if ( err ) {
          return Error(err);
        } else {
          return callback(err, src);
        }
    });
  }
}

function HTML(req, res){
	if ( !(this instanceof HTML) )
  		return new HTML(req, res);

  this.req = req;
  this.res = res;
}

HTML.prototype.loadPartial = function(f, callback){
	var  req 	= this.req
		,res	= this.res
		,err	= null
		,data 	= fs.readFileSync(__dirname + '/../views/' + f, 'utf-8')
		,page	= this.render(err, data);
		;
		
	return page;
}

HTML.prototype.render = function(err, data){
	if ( err ) this.req.router.error( Error(err) );
	if ( data ) {
		var amatch = data.match(/\{{(.*?)\}}/g) || ''; //data.match(/{{\s+(.*?)\s+}}/g);
	    if ( amatch.length ) {
			for ( var i in amatch ) {
				// replace the brackets and spaces around the command with nothing, so we can execute the command
				data = data.replace(amatch[i], eval(amatch[i].replace(/({{\s+|\s+}})/g, '')));
			}
	    }
	}
    return data;	
}





exports.HTML = HTML;
