var assert = require('chai').assert;
var request = require('request');
var app = require('../server.js');
var pry = require('pryjs');


describe("Server", function(){
  before(function(done){
      this.port = 9876
      this.server = app.listen(this.port, function(err, result){
        if (err) { return done(err); }
        done();
      });

      this.request = request.defaults({
          baseUrl: 'http://localhost:9876/'
        });
    });

  after(function(){
      this.server.close();
  });

  it('should exist', function(){
    assert(app);
  });

  describe('GET /', function(){
    it('should return a 200', function(done){
      this.request.get('/', function(error, response){
        if (error) { done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('GET /api/foods/:id', function(){
    beforeEach(function(){
      app.locals.foods = {
        wowowow: 'I am a banana'
      }
    });

    it('should return a 404 if the resource is not found', function(done){
      this.request.get('/api/foods/bahaha', function(error, response){
        if(error) { done(error) }
        assert.equal(response.statusCode, 404);
        done();
      });
    });

    it('should return a 200 if the resource is found', function(done){
      this.request.get('/api/foods/wowowow', function(error, response){
        if(error) { done(error) }
        assert.equal(response.statusCode, 200);
        assert(response.body.includes('wowowow'), 'ID was not included');
        assert(response.body.includes('I am a banana'), 'ID was not included');
          done();
      });
    });
  });

  describe('POST /api/foods', function(){
    beforeEach(function(){
      app.locals.foods = {}
    });

    it('should not return 404', function(done){
      this.request.post('/api/foods', function(error, response){
        if (error) { done(error) }
        assert.notEqual(response.statusCode, 404)
        done();
      });
    });

    it('should receive and store data', function(done){
      var message = { message: 'I dont like Pineapples on my pizza'};

      this.request.post('/api/foods', { form: message }, function(error, response){
        if (error) { done(error); }
        done();
        var foodCount = Object.keys(app.locals.foods).length;
        assert.equal(foodCount, 1, `expected 1 food, found ${foodCount}`);
      });
    });
  });
});
