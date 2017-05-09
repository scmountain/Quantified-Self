const assert = require('chai').assert;
const app = require('../server');
const request = require('request');


const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)

describe("Server", function(){
  before(done => {
      this.port = 9876
      this.server = app.listen(this.port, (err, result) => {
        if (err) { return done(err); }
        done()
      });

      this.timeout(100000);
      this.request = request.defaults({
          baseUrl: 'http://localhost:9876/'
        });
    });

  after(() => {
      this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert.equal(response.statusCode, 200);

        done()
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title

      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert(response.body.includes(title), `"${response.body}" does not include "${title}".`)

        done()
      });
    });
  });

  describe('GET /api/foods/:id', () => {
    beforeEach((done) => {
      database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Sweet Baby Rays', 2000, new Date])
      .then(() => done())
    });

    afterEach((done) => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done())
    });

    it('should return a 404 if the resource is not found', (done) => {
      this.request.get('/api/foods/10000', (error, response) => {
        if(error) { done(error) }
        assert.equal(response.statusCode, 404);
        done();
      });
    });

    it('should return name, calories, and id from the resource found', (done) => {

      this.request.get('/api/foods/1', (error, response) => {
        if(error) { done(error) }

        const id = 1
        const name = "Sweet Baby Rays"
        const calories = 2000

        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, name)
        assert.equal(parsedFood.calories, calories)
        assert.ok(parsedFood.created_at)

        done();
      });
    });
  });

  describe('POST /api/foods', function(){
    var close_request = request.defaults({
          baseUrl: 'http://localhost:9876/'
        });

     this.timeout(100000);
    it('should not return 404', function(done){
      var food = { name: 'apple', calories: 100}

      close_request.post('/api/foods', {form: food}, (error, response) =>{
        if (error) { done(error) }
          let parsedFood = JSON.parse(response.body.toString());
          assert.equal(response.statusCode, 200)
          done();
      });
    });

    xit('should receive and store data', function(done){
    });
  });
});
