var express = require('express');
var router = express.Router();

var Recepcionist = require('../models/Recepcionists.js');

router.get('/byId/:id', function(req, res, next) {
  Recepcionist.findById(req.params.id, function (err, model) {
    if (err) return res.send(JSON.stringify({ error : err }));
    
    res.send(JSON.stringify({ result : model }));
  });
});

router.post('/', function(req, res, next) {
    var newModel = new Recepcionist(req.body);
    newModel.save(function (err) {
        if (err) return res.send(JSON.stringify({ error : err }));

        res.send(JSON.stringify({ result : newModel }));
    });
});

router.put('/:id', function(req, res, next) {
  Recepcionist.findByIdAndUpdate(req.params.id, req.body, function (err, model) {
    if (err) return res.send(JSON.stringify({ error : err }));

    res.send(JSON.stringify({ result : model }));
  });
});

router.get('/all', function(req, res, next) {
  Recepcionist.find({
      companyId : req.query.companyId
    }, function (err, models) {
        if (err) return next(err);

        if(models === null)
            return res.send(JSON.stringify({result : []})); 

        res.send(JSON.stringify({ result : models }));
    });
});

router.delete('/:id', function(req, res, next) {
  Recepcionist.findByIdAndRemove(req.params.id, req.body, function (err, model) {
    if (err) return res.json({error : err});
    
    res.json({success : true});
  });
});

module.exports = router;
