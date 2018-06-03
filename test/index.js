const test = require('blue-tape');
var parser = require('../lib/parser') ;

test('parse digest auth', (t) => {
  const hdrValue = 'username=\"103482\",realm=\"sip.drachtio.org\",nonce=\"df24fd41-4fc5-416f-b163-90f774ca0358\",' + 
    'uri=\"sip:75.1.46.10:6060\",algorithm=MD5,response=\"a4881ad854cc0677158206ac9fa90e3b\",qop=auth,nc=00000032,cnonce=\"ea5cec20\"' ;

  const auth = parser.digest(hdrValue) ;
  t.equal(auth.scheme, 'digest', 'scheme is correct');
  t.equal(auth.username, '103482', 'username is correct');
  t.equal(auth.nonce, 'df24fd41-4fc5-416f-b163-90f774ca0358', 'nonce is correct');
  t.equal(auth.uri, 'sip:75.1.46.10:6060', 'uri is correct');
  t.equal(auth.algorithm, 'MD5', 'algorithm is correct');
  t.equal(auth.response, 'a4881ad854cc0677158206ac9fa90e3b', 'response is correct');
  t.equal(auth.qop, 'auth', 'qop is correct');
  t.equal(auth.nc, '00000032', 'nc is correct');
  t.equal(auth.cnonce, 'ea5cec20', 'cnonce is correct');
  t.end();
});

test('parse basic auth', (t) => {
  const hdrValue = 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==' ;
  const auth = parser.basic(hdrValue);
  t.equal(auth.scheme, 'basic', 'scheme is correct');
  t.equal(auth.username, 'Aladdin', 'username is correct');
  t.equal(auth.password, 'open sesame', 'password is correct');
  t.end();  
});
