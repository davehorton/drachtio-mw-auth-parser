const parser = require('./lib/parser') ;
const assert = require('assert') ;

module.exports = function(req, res, next) {
  assert(typeof req.authorization === 'undefined', 'drachtio-mw-auth-parser has been used twice');

  req.authorization = {};
  if (!req.has('authorization')) return next();

  req.username = 'anonymous';

  const authorization = req.get('authorization') ;

  const arr = /^(.*?)\b(.*?)$/.exec( authorization ) ;
  if (!arr) {
    return next(new Error(`Invalid Authorization header: ${authorization}`));
  }
  else if (-1 === ['Digest','Basic'].indexOf(arr[1])) {
    return next(new Error(`Invalid/unknown Authorization scheme: ${arr[1]}`));
  }

  try {
    Object.assign(req.authorization, parser[arr[1].toLowerCase()](arr[2]));
  } catch (e) {
    res.send(400) ;
  }

  next() ;
};
