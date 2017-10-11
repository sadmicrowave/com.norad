/*
    Get, and return, the local host IP address, IPv4
*/
// -------------------------------------------------------------------------------------------------------- //
// ********************************************* @@@ IMPORTS @@@ ****************************************** //
// -------------------------------------------------------------------------------------------------------- //
var os    = require('os')
    ;

function getIP() {
  var  address   = null
      ,ifaces    = os.networkInterfaces()
      ;

  for ( var dev in ifaces ) {
      // ... and find the one that matches the criteria
      var iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
      });

      if(iface.length > 0) address = iface[0].address;
  }
  return address;
}
exports.IP = getIP;
