const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)
const pry = require('pryjs')

module.exports = {
  find: (id) => {
    let getQuery = 'SELECT * FROM foods WHERE foods.id = ?'
    return database.raw(getQuery, [id]).then( data => data.rows[0] || undefined  )
  },

  create: (food) => {
    let insertQuery = "INSERT INTO foods (name, calories) VALUES (?, ?)";
    let insertData = [food.name, food.calories];
    return database.raw(insertQuery, insertData);
  },

  deleteFood: (id) => {
    let deleteQuery = "DELETE FROM foods WHERE id = ?";
    return database.raw(deleteQuery, [id]);
  },

  // editFood: (food) => {
  //   let updateDatabase = ''
  // }
}
