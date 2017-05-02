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
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}

			var obj = JSON.parse(res.text);
			assert.equal(obj.result.name, 'Place test');
			done();
		});

	});

	describe('Place', function() {
  		it('should correctly vote on my favorite place', function(done) {
  		
  		var body = {
  			name : 'Place test',
  			history: []
  		};


	    request(url)
  		.post('/places')
  		.send(body)
		.expect(200) //Status code
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
});