var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

router.post('/', function(req, res, next) {
  console.log('post')
});

router.get('/:id', function(req, res, next) {
  console.log('get')
});

router.put('/:id', function(req, res, next) {
  console.log('put')
});

router.delete('/:id', function(req, res, next) {
  console.log('delete')
});

router.post('/auth', function(req, res, next) {
    User.findOne({
      email : req.body.email,
      pwd: req.body.pwd
    }, function (err, user) {
        if (err) return next(err);

        if(user === null)
            return res.send(JSON.stringify({error : 'notfound'})); 

        res.send(JSON.stringify({ result : user }));
    });
});

module.exports = router;
