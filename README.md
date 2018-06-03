# drachtio-mw-auth-parser [![Build Status](https://secure.travis-ci.org/davehorton/drachtio-mw-auth-parser.png)](http://travis-ci.org/davehorton/drachtio-mw-auth-parser) [![NPM version](https://badge.fury.io/js/drachtio-mw-auth-parser.svg)](http://badge.fury.io/js/drachtio-mw-auth-parser)

drachtio middleware for parsing SIP Authorization header, supporting Digest and Basic authorization

## Usage

```js
const Srf = require('drachtio-srf');
const srf = new Srf();
const authParser = require('drachtio-mw-auth-parser') ;

srf.connect({...}) ;

srf.use(authParser) ;

srf.register(( req, res ) => {
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
}) ;
```
