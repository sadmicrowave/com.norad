/*
Node.js does not have a built-in logging and log rotating module, so here we build
our own.  Log files will rotate to the nth file after reaching x size in Bytes.
The format of the file names during rotation will be:
[log file name].log
[log file name].log.1
[log file name].log.2
[log file name].log.3
[log file name].log.4
etc...

This implementation of console.log also extends the original functionality
by writing to stdout.
*/


// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
 var fs 	  = require('fs')
 	  ,util 	= require('util')
    ;

// define the log path and file access options
 var  filename = 'com.sadmicrowave.norad.log'
 	 ,path		   = '{0}/var/log'.format(process.cwd())
 	 ,filepath	 = '{0}/{1}'.format(path, filename)
 	 ,logFile 	 = fs.createWriteStream(filepath, {flags : 'w'}) // define log location and file type
 	 ,fstats	   = fs.statSync(filepath)
 	 //,logStdout  = process.stdout // redirect stdout to variable
 	 ,elog 		   = console.log
 	 ,d 		     = new Date() // create date object used in datestamping log entries
 	 ,maxBytes 	 = 100000 // max file size in bytes before file rotation creates a new file
 	 ,maxFiles	 = 5
	 ;

// override console.log with the following functionality
console.log = function(msg){
	elog.apply(this, arguments);

	// if maxBytes is exceeded, rotate the log file to a new digit and create a new log file
	if ( fstats['size'] >= maxBytes ){
		// setup the file log rotator
		fs.readdir( '{0}/'.format(path), function(err, files){
			// throw error if readdir returns error
			if ( err ) throw err;
			// create empty buffer to hold all potential file names
			var namebuff = [];
			// iterate i into range of max log files allowed
			for ( var i = 0; i <= maxFiles; i++ )
				if ( i == 0 ) // push normal log file name with no number appeneded
					namebuff.push( filename );
				else // push log filename with digit appended, up to maxFiles
					namebuff.push( filename + '.' + i.toString() );

			// action upon the files array element
			files
				.filter(function(file) { var re = new RegExp('^' + filename + '*'); return re.test(file); }) // filter on regex match to only match filenames for this log application
				.sort() // sort the results in asc order
				.reverse() // reverse order so list is now descending
				.forEach(function(file,i){ // for each filename not filtered, do the following actions...
					var m = files.length; // get total number of files
					// rename the file based on index number
					fs.rename('{0}/{1}'.format(path, file), '{0}/{1}'.format(path,namebuff[m-i]));
				});

			// remove any files with the name 'undefined' as a result of the faulty 'undefined' return from forEach()
			fs.unlink( '{0}/undefined'.format(path) );

			logFile.close(); // close the existing filestream
			// create a new filestream with basename of log file
			logFile = fs.createWriteStream('{0}/{1}'.format(path, filename), {flags : 'w'}) // define log location and file type

		});
	}

	// add log line to log file
	logFile.write('{0}: {1}\n'.format(d.toString(), util.format(msg)));

}
exports.console = console;
