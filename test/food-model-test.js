const pry = require('pryjs')
const assert = require('chai').assert;
const Food = require('../lib/models/food');

const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)


describe('Food model', function(){
  beforeEach((done) => {
    database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`,
                  ['Sweet Baby Rays', 2000, new Date])
    .then(() => done())
  });

  afterEach((done) => {
    database.raw('TRUNCATE foods RESTART IDENTITY')
    .then(() => done())
  });

  it('tests the methods on the model', function(){
    const data = Food.find(1)
                .then((data) => {
                  return data
                });
                eval (pry.it)
    assert.equal(data, 'Sweet Baby Rays')
  })
})
