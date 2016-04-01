// use this method to merge objects

Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        if ( from ) {
          var props = Object.getOwnPropertyNames(from);
          var dest = this;

          //console.log( props, dest );
          props.forEach(function(name) {
              var destination = Object.getOwnPropertyDescriptor(from, name);
              //console.log( 'dest: ', from, destination );
              if ( destination.value )
                Object.defineProperty(dest, name, destination);
          });
        }
        return this;
    }
});

/*
var o = {'port':443}
  .extend({'port':null})
  ;

console.log(o);
*/
