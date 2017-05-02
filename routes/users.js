var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

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

router.post('/recover', function(req, res, next) {
   User.findOne({ email : req.body.email }, function (err, user) {
    if (err) return res.send(JSON.stringify({ error : err }));
    
    if(!user)
      return res.send(JSON.stringify({ error : "Not found" }));

    user.pwd = 'c90796369a77805cf3c2131228ba749b';
    user.save(function(){
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'contatoadmeventos@gmail.com', // Your email id
              pass: 'Cont@to2017*' // Your password
          }
      });

      var text = 'Sua nova senha é @Dm2017*\n\nNão esqueça de alterar a senha.';

      var mailOptions = {
          from: 'contatoadmeventos@gmail.com', // sender address
          to: user.email, // list of receivers
          subject: 'Nova senha', // Subject line
          text: text //, // plaintext body
          // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
              return res.send(JSON.stringify({ error : error }));
          }else{
              console.log('Message sent: ' + info.response);
              res.send(JSON.stringify({ result : true }));
          };
      });      
    })
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
