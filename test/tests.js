var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');

describe('Routing', function() {
	var url = 'http://localhost:3000';

	before(function(done) {
	    // In our tests we use the test db
	    mongoose.connect('mongodb://restaurant:123456@ds127731.mlab.com:27731/restaurants');							
	    done();
	});

	describe('Place', function() {
		it('should correctly add one place', function(done) {

			var body = {
				name : 'Place test',
				history: []
			};


			request(url)
			.post('/places')
			.send(body)
			.expect(200)
			.end(function(err,res) {
				if (err) {
					throw err;
				}

				var obj = JSON.parse(res.text);
				assert.equal(obj.result.name, 'Place test');
				done();
			});

		});

	});

	describe('Vote 1', function() {
		before(function(done) {
        	request(url)
				.post('/votes/deleteAllByUserId')
				.send({
					userId : '5908869db6d1556c0d9207cd'
				})
				.expect(200)
				.end(function(err,res) {
					if (err) {
						throw err;
					}
					done();
				});
	    });

		it('should correctly vote on my favorite place', function(done) {

			var body = {
				userId : '5908869db6d1556c0d9207cd',
				placeId: '5908c23cbedd47c01057510f'
			};

			request(url)
			.post('/votes')
			.send(body)
			//.expect(200)
			.end(function(err,res) {
				if (err) {
					throw err;
				}

				var obj = JSON.parse(res.text);
				assert.equal(obj.result.userId, '5908869db6d1556c0d9207cd');
				assert.equal(obj.result.placeId, '5908c23cbedd47c01057510f');
				done();
			});

		});
	});

	describe('Vote again same day', function() {
		it('should correctly deny more than one vote per day', function(done) {

			var body = {
				userId : '5908869db6d1556c0d9207cd',
				placeId: '5908c23cbedd47c01057510f'
			};

			request(url)
			.post('/votes')
			.send(body)
			//.expect(200)
			.end(function(err,res) {
				if (err) {
					throw err;
				}

				var obj = JSON.parse(res.text);
				assert.equal(obj.error, 'You can vote just once per day.');
				done();
			});

		});
	});
});