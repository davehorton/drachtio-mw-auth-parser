'use strict' ;

module.exports = {

    basic: function(hdrValue) {
        var decoded = (new Buffer(hdrValue, 'base64')).toString('utf8');
        if (!decoded) { throw new Error('Authorization header invalid: ' + hdrValue); }

        var arr = /^(.*):(.*)$/.exec( decoded ) ;
        if( !arr ) { throw new Error('Authorization header invalid: ' + hdrValue); }

        return ( {scheme: 'basic', username: arr[1], password: arr[2]} );        
    },
    digest: function(hdrValue) {
        var pieces = { scheme: 'digest'} ;
        ['username','realm','nonce','uri','algorithm','response','qop','nc','cnonce','opaque'].forEach(function(tok) {
          var s = tok + '="?(.+?)[",]' ;
          var re = new RegExp(s) ;
          var arr = re.exec( hdrValue ) ;
          if( arr ) {
              pieces[tok] = arr[1];
          }
        }) ;

        pieces.algorithm = pieces.algorithm || 'MD5' ;

        // check mandatory fields
        ['username','realm','nonce','uri','response'].forEach(function(tok) {
            if( !(tok in pieces ) ) { throw new Error('missing authorization component: ' + tok); }
        }) ;

        return pieces ;
    }
} ;
