const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function find(id) {
  return database.raw('SELECT * FROM foods WHERE foods.id = ? LIMIT 1', [id])
}

module.exports = {
  find: find
}