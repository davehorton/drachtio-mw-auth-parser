# drachtio-mw-auth-parser
drachtio middleware for parsing SIP Authorization header, supporting Digest and Basic authorization

## Usage

```js
var drachtio = require('drachtio');
var app = drachtio() ;
var authParser = require('drachtio-mw-auth-parser') ;


app.connect({...}) ;

app.use( authParser ) ;

app.register( function( req, res ){
  console.log(req.authorization) ;
  /*
    Digest: username="103482",realm="sip.drachtio.org",nonce="df24fd41-4fc5-416f-b163-90f774ca0358" \
      uri="sip:73.15.46.10:6060",algorithm=MD5,response="a4881ad854cc0677158206ac9fa90e3b", \
      qop=auth,nc=00000032,cnonce="ea5cec20"

    console.log =>
    {
      scheme: 'digest',
      username: '103482',
      realm: 'sip.drachtio.org',
      nonce: 'df24fd41-4fc5-416f-b163-90f774ca0358',
      uri: 'sip:72.1.46.10:6060',
      algorithm: 'MD5',
      response: 'a4881ad854cc0677158206ac9fa90e3b',
      qop: 'auth',
      nc: '00000032',
      cnonce: 'ea5cec20'
    }
   */
  {
    
}) ;


   */
}) ;

```
