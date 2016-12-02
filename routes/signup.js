var express = require('express');
var router = express.Router();

var SignupContact = require('../models/SignupContact.js');

router.put('/', function(req, res, next) {
  SignupContact.create(req.body, function (err, contact) {
    if (err) {
        res.json({error : err});
    }
    res.json(contact);
  });
});

module.exports = router;
