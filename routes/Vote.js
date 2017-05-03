var express = require('express');
var router = express.Router();

var Vote = require('../models/Vote.js');
var User = require('../models/User.js');

router.put('/:id', function(req, res, next) {
	Vote.findByIdAndUpdate(req.params.id, req.body, function (err, model) {
		if (err) return res.send(JSON.stringify({ error : err }));

		res.send(JSON.stringify({ result : model }));
	});
});


router.post('/', function(req, res, next) {
	var newModel = new Vote(req.body);
	var dateFiter = new Date(new Date().setHours(0,0,0,0));

	//first check if the user has voted today
	Vote.find({ "userId" : req.body.userId, "date" : { $gte :  dateFiter } }, 
	function (errValidUserHasVoted, voteUser) {
		if (errValidUserHasVoted) {
			return next(errValidUserHasVoted);
		}
		if(voteUser.length > 0){
			return res.send(JSON.stringify({error : 'You can vote just once per day.'}));
		}else{
			newModel.save(function (err) {
			if (err) return res.send(JSON.stringify({ error : err }));

				//check if all users have voted
				//1 - get total users		
				User.find({}, function (err, users) {
					if (err) return next(err);

					var totalUsers = users.length;

					//2 - get total votes
					Vote.find({ "date" : { $gte :  dateFiter } }, 
						function (err, models) {
							if (err)
								return next(err);						

							var totalVotes = models.length;

						//if all users have voted, we can define the winner
						if(totalVotes == totalUsers){

							//get the winner and save on his history
							Vote.aggregate( 
								{ $match: { "date" : { $gte :  dateFiter } } },
								{ $group: { _id: '$placeId', total_votes: { $sum: 1 } } },
								{ $sort: { total_votes: -1} },
								function (err, resVote) {
									if (err) return handleError(err);							 	

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
										});
									});

								});
						}
					});
				});

				res.send(JSON.stringify({ result : newModel }));		
			});
		}
	});
	
});

router.get('/findTodayByUserId', function(req, res, next) {
	var dateFiter = new Date(new Date().setHours(0,0,0,0));

	Vote.find({ "userId" : req.query.userId, "date" : { $gte :  dateFiter } }
		, function (err, models) {
			if (err) {
				return next(err);
			}

			if(models === null)
				return res.send(JSON.stringify({result : []})); 

			res.send(JSON.stringify({ result : models }));
		});
});

router.delete('/:id', function(req, res, next) {
	Vote.findByIdAndRemove(req.params.id, req.body, function (err, model) {
		if (err) return res.json({error : err});

		res.json({success : true});
	});
});

router.post('/deleteAllByUserId', function(req, res, next) {

	Vote.remove({
		userId : req.body.userId
	}, 
	function (err, model) {
		if (err) return res.json({error : err});

		res.json({success : true});
	});

});

module.exports = router;

