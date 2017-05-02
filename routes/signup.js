var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

router.post('/', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err) return res.send(JSON.stringify({ error : err }));

        //do not send the password, ;)
        delete newUser.pwd;

        res.send(JSON.stringify({ result : newUser }));
    });
});

module.exports = router;
