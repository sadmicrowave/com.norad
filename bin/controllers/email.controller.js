/*
  Create email object functions for various service functions through application.
*/
// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var  sendgrid     = require('sendgrid')('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')
    ,format	      = require('../lib/format.js')			// get functionality for formatting strings
    ,ErrorHandler = require('../lib/error.js').ErrorHandler // get individual error handler class for locally thrown errors
    ,ip           = require('../lib/ip.js').IP   // call function to get current server IP address
    ,os			  = require('os')
    ;


	
function ActivationEmail(useremail, activation_key, callback, router) {
    // Activation email sends to user with activationUrl link in active now button
    var email = new sendgrid.Email();
    email.addTo(useremail);
    email.subject = "Welcome To Norad! Confirm Your Email";
    email.from = 'Activation@norad.com';
    email.text = '';
    email.html = ' ';
    email.addSubstitution('activating_user_email', useremail);
    email.addSubstitution('activation_url', 'http://{0}:{1}/users?ak={2}'.format(os.hostname(), process.env.PORT, activation_key));

    // or set a filter using an object literal.
    email.setFilters({
        'templates': {
            'settings': {
                 'enable': 1
                ,'template_id' : '388f5b29-d572-4b8a-98fd-80856ed452a0' // sendgrid template id for activation email template
            }
        }
    });

    sendgrid.send(email, function(err, json) {
      if (err) return router.error( Error(err) );
      else
        if ( callback instanceof Function )
          return callback();
    });
}



function ContactEmail(useremail, message, callback, router) {
	// Contact email sends to admin with contact message
    var email = new sendgrid.Email();
    email.addTo(process.env.ADMIN);
    email.subject = "Norad User Contact";
    email.from = 'Contact@norad.com';
    email.text = '';
    email.html = ' ';
    email.addSubstitution('sending_user_email', useremail);
    email.addSubstitution('message_content', message);

    // or set a filter using an object literal.
    email.setFilters({
        'templates': {
            'settings': {
                 'enable': 1
                ,'template_id' : 'd0b76ddb-930a-4169-96d4-3882647d71cd' // sendgrid template id for activation email template
            }
        }
    });
	
	
    sendgrid.send(email, function(err, json) {
		if (err) return router.error( Error(err) );
				
		if ( callback instanceof Function )
			return callback();
	
    });
}

exports.ActivationEmail = ActivationEmail;
exports.ContactEmail = ContactEmail;
