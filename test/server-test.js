
const assert = require('chai').assert;
const app = require('../server');
const request = require('request');
const pry = require('pryjs')


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

  context('GET /', () => {
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

  context('PUT /api/v1/foods/1', () => {

    beforeEach(function(done) {
      database.raw(`INSERT INTO foods (ID, NAME, CALORIES) VALUES (1, 'flowers', 2000);`)
      .then(() => done())
      .catch(done);
    });

    afterEach(function(done) {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done())
      .catch(done);
    });

    it('should update a food entry', (done) => {
      var newFood = { name: 'babies', calories: '350'}

      this.request.put('/api/v1/foods/1', {form: newFood}, (error, response) => {
        if (error) { done(error) }
        this.timeout(100000)
        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.rows[0].id, 1)
        assert.equal(parsedFood.rows[0].name, 'babies')
        assert.equal(parsedFood.rows[0].calories, 350)
        done()
      });
    });
  });

    context('GET /api/v1/foods/:id', (done) => {
      beforeEach((done) => {
        database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Sweet Baby Rays', 2000, new Date])
        .then(() => done())
        .catch(done);
      });

      afterEach((done) => {
        database.raw('TRUNCATE foods RESTART IDENTITY')
        .then(() => done())
        .catch(done);
      });

      it('should return a 404 if the resource is not found', (done) => {
        this.request.get('/api/v1/foods/100000', (error, response) => {
          if(error) { done(error) }
          assert.equal(response.statusCode, 404);
          done();
        });
      });

      it('should return name, calories, and id from the resource found', (done) => {

        this.request.get('/api/v1/foods/1', (error, response) => {
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

    context('GET /api/foods', () => {
        beforeEach((done) => {
          database.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ['banana', 35]).then (() => {
          database.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ['strawberry', 40]).then (() => {
          database.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ['cereal', 135]).then (() => {
            done()
          });
        });
      });
    });


    });


    context('POST /api/foods', function(done){
      var close_request = request.defaults({
            baseUrl: 'http://localhost:9876/'
          });

      it('should not be a 404 error', function(done) {
        close_request.post('/api/v1/foods/', (error, response) => {
          if(error) { done(error) }
          assert.notEqual(response.statusCode, 404);
          done();
        });
      });

      it('should receive and store data', function(done){
        let food = { name: 'apple', calories: 100}

        close_request.post('/api/v1/foods', {body: food, json: true}, (error, response) =>{
          if (error) { done(error) }
            assert.equal(response.statusCode, 200)
            done();
        });
      });

      it('should return food that was created', function(done){
        let food = { name: 'apple', calories: 100}
        this.timeout(1000000)

        close_request.post('/api/v1/foods', {form: food}, (error, response) =>{
          if (error) { done(error) }
            let parsedFood = JSON.parse(response.body)
            assert.equal(parsedFood.rows[0].name, food.name)
            done();
        });
      });
    });

    context('DELETE /api/v1/foods/:id', () =>{

      beforeEach(function(done) {
        database.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ['Sweet Baby Rays', 2000])
        .then(() => done())
        .catch(done);
      });

      afterEach(function(done) {
        database.raw('TRUNCATE foods RESTART IDENTITY')
        .then(() => done ())
        .catch(done);
      });

      it('should return 201', (done) => {
        this.request.delete('/api/v1/foods/1', (error,response) => {
          if (error) { done(error) }
          done();
          assert.equal(response.statusCode, 200)
        });
      });
    });
});
