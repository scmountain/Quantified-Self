const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function find(id) {
  return database.raw('SELECT * FROM foods WHERE foods.id = ? LIMIT 1', [id])
}

function insert_food(name, calories) {
  return database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, [name, calories, new Date])
}

module.exports = {
  find: find
  insert_food: insert_food
}