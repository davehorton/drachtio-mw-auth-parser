module.exports = {

  basic: (hdrValue) => {
    const decoded = (new Buffer(hdrValue, 'base64')).toString('utf8');
    if (!decoded) throw new Error(`Authorization header invalid: ${hdrValue}`);

    const arr = /^(.*):(.*)$/.exec( decoded ) ;
    if (!arr) throw new Error(`Authorization header invalid: ${hdrValue}`);

    return ({
      scheme: 'basic',
      username: arr[1],
      password: arr[2]
    });
  },
  digest: (hdrValue) => {
    const pieces = { scheme: 'digest'} ;
    ['username', 'realm', 'nonce', 'uri', 'algorithm', 'response', 'qop', 'nc', 'cnonce', 'opaque'].forEach((tok) => {
      var re = new RegExp(`${tok}="?(.+?)[",]`) ;
      var arr = re.exec(hdrValue) ;
      if (arr) pieces[tok] = arr[1];
    }) ;

    pieces.algorithm = pieces.algorithm || 'MD5' ;

    // check mandatory fields
    ['username', 'realm', 'nonce', 'uri', 'response'].forEach((tok) => {
      if (!pieces[tok]) throw new Error(`missing authorization component: ${tok}`);
    }) ;

    return pieces ;
  }
} ;
