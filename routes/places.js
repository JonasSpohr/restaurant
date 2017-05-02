var express = require('express');
var router = express.Router();

var Place = require('../models/Places.js');
var Vote = require('../models/Vote.js');
var User = require('../models/User.js');

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

router.get('/allAvailableForVote', function(req, res, next) {
  var filterDate = new Date(getMonday(new Date()).setHours(23,59,59,0));

  console.log('filterDate: ' + filterDate)
  Place.find({ $or: [ { "history.date": { $lt: filterDate } }, { "history.0": {$exists: false} } ] }
    , function (err, models) {
      if (err) {
        return next(err);
      }

      if(models === null)
        return res.send(JSON.stringify({result : []})); 

      res.send(JSON.stringify({ result : models }));
    });
});

router.get('/winner', function(req, res, next) {
  var dateFiter = new Date(new Date().setHours(0,0,0,0));

  //date limit for voting 11:45 every morning
  //IF WE DONT HAVE ANY VOTE, I GET THE FIRST PLACE I CAN FIND
  var dateLimit = new Date(new Date().setHours(11,45,0,0));

    //try to find thw winner for today
    Place.find({ "history.date" : { $gte :  dateFiter } }
    ,function (err, models) {
      if (err)
        return next(err);

      //if we didnt found one winner, we test if the time is after 11:45AM
      if(models.length == 0 && dateLimit < new Date()){

          //get the most voted place OR the first is there is a draw
          Vote.aggregate(
          { $match: { "date" : { $gte :  dateFiter } } },
          { $group: { _id: '$placeId', total_votes: { $sum: 1 } } },
          { $sort: { total_votes: -1} },
          function (errVote, resVote) {
            if (errVote) return handleError(errVote);

            //if we have votes, we get the most voted
            if(resVote.length > 0){
               //get the place to add on his history of winners day
               Place.findOne({_id: resVote[0]._id }, function (errPlace, place) {
                  
                  if(errPlace)
                      console.error(errPlace);

                  place.history.push({
                    date: new Date(),
                    votes: resVote[0].total_votes
                  });

                  place.save(function (errSavePlace) {
                      if(errSavePlace)
                          console.error(errSavePlace);
                      
                    res.send(JSON.stringify({ result : place }));
                  });
                });
            }else{
              //we get the first
              Place.find({}, function (errPlaceFind, placeFind) {
                if (errPlaceFind) return next(errPlaceFind);

                if(placeFind === null)
                  return res.send(JSON.stringify({result : []})); 

                placeFind[0].history.push({
                    date: new Date(),
                    votes: 0
                })

                placeFind[0].save(function (errSavePlace) {
                  if(errSavePlace)
                    console.error(errSavePlace);
                });

                res.send(JSON.stringify({ result : placeFind[0] }));
              });
            }  
         });

      }else{

        //return the winner
        res.send(JSON.stringify({ result : models }));
      }
    });
});

router.delete('/:id', function(req, res, next) {
  Place.findByIdAndRemove(req.params.id, req.body, function (err, model) {
    if (err) return res.json({error : err});
    
    res.json({success : true});
  });
});

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6:1);
  return new Date(d.setDate(diff));
}

module.exports = router;
