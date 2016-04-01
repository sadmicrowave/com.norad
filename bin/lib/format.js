// use this function for adding to string type methods for a formatting option
// utiliziation: "{0},{1} my string.".format( 'hello', 'world' ) // yields: "hello,world my string"

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
