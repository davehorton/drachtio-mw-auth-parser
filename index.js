'use strict';

var extend = require('extend') ;
var parser = require('./lib/parser') ;

module.exports = function (req, res, next) {
    if (!req.has('authorization')) { return next(); }

    req.authorization = {};
    req.username = 'anonymous';

    var authorization = req.get('authorization') ;

    var arr = /^(.*?)\b(.*?)$/.exec( authorization ) ;
    if( !arr ) {
        return next( new Error('Invalid Authorization header: ' + authorization)) ;        
    }
    else if( -1 === ['Digest','Basic'].indexOf( arr[1] ) ) {
        return next( new Error('Invalid/unknown Authorization scheme: ' + arr[1])) ;        
    }

    try {
        extend( req.authorization, parser[arr[1].toLowerCase()]( arr[2] ) ) ;
    } catch (e) {
        res.send(400) ;
    }

    next() ;
};