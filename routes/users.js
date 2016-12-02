var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

router.get('/byId/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.send(JSON.stringify({ error : err }));
    
    res.send(JSON.stringify({ result : user }));
  });
});

router.post('/', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err) return res.send(JSON.stringify({ error : err }));

        res.send(JSON.stringify({ result : newUser }));
    });
});

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return res.send(JSON.stringify({ error : err }));

    res.send(JSON.stringify({ result : user }));
  });
});

router.get('/all', function(req, res, next) {
  User.find({
      companyId : req.query.companyId
    }, function (err, users) {
        if (err) return next(err);

        if(users === null)
            return res.send(JSON.stringify({result : []})); 

        res.send(JSON.stringify({ result : users }));
    });
});

router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return res.json({error : err});
    
    res.json({success : true});
  });
});

module.exports = router;
