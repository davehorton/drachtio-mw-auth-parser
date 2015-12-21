var assert = require('assert');
var should = require('should');
var parser = require('../../lib/parser') ;

describe('authParser', function(){
  it('should parse a valid Digest Authorization header', function(){
    var hdrValue = 'username=\"103482\",realm=\"sip.drachtio.org\",nonce=\"df24fd41-4fc5-416f-b163-90f774ca0358\",' + 
      'uri=\"sip:75.1.46.10:6060\",algorithm=MD5,response=\"a4881ad854cc0677158206ac9fa90e3b\",qop=auth,nc=00000032,cnonce=\"ea5cec20\"' ;

    var auth = parser.digest( hdrValue ) ;
    auth.should.have.property('scheme','digest') ;
    auth.should.have.property('username','103482') ;
    auth.should.have.property('realm','sip.drachtio.org') ;
    auth.should.have.property('nonce','df24fd41-4fc5-416f-b163-90f774ca0358') ;
    auth.should.have.property('uri','sip:75.1.46.10:6060') ;
    auth.should.have.property('algorithm','MD5') ;
    auth.should.have.property('response','a4881ad854cc0677158206ac9fa90e3b') ;
    auth.should.have.property('qop','auth') ;
    auth.should.have.property('nc','00000032') ;
    auth.should.have.property('cnonce','ea5cec20') ;
  }) ;
  it('should parse a valid Basic Authorization header', function(){
    var hdrValue = 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==' ;

    var auth = parser.basic( hdrValue ) ;
    auth.should.have.property('scheme','basic') ;
    auth.should.have.property('username','Aladdin') ;
    auth.should.have.property('password','open sesame') ;
  }) ;
}) ;
