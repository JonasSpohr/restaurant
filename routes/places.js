var express = require('express');
var router = express.Router();

var Place = require('../models/Places.js');

router.get('/byId/:id', function(req, res, next) {
  Place.findById(req.params.id, function (err, model) {
    if (err) return res.send(JSON.stringify({ error : err }));
    
    res.send(JSON.stringify({ result : model }));
  });
});

router.post('/', function(req, res, next) {
    var newModel = new Place(req.body);
    newModel.save(function (err) {
        if (err) return res.send(JSON.stringify({ error : err }));

        res.send(JSON.stringify({ result : newModel }));
    });
});

router.put('/:id', function(req, res, next) {
  Place.findByIdAndUpdate(req.params.id, req.body, function (err, model) {
    if (err) return res.send(JSON.stringify({ error : err }));

    res.send(JSON.stringify({ result : model }));
  });
});

router.get('/all', function(req, res, next) {
  Place.find({}, function (err, models) {
        if (err) return next(err);

        if(models === null)
            return res.send(JSON.stringify({result : []})); 

        res.send(JSON.stringify({ result : models }));
    });
});

router.delete('/:id', function(req, res, next) {
  Place.findByIdAndRemove(req.params.id, req.body, function (err, model) {
    if (err) return res.json({error : err});
    
    res.json({success : true});
  });
});

module.exports = router;
