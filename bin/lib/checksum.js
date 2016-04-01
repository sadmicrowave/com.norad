/*
 Perform and return a hash string from passed encoding type and input string
*/
// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var crypto 	= require('crypto');

function checksum (str, algorithm, encoding) {

    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

exports.checksum = checksum;
