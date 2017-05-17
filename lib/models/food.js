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
    let insertQuery = "INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING * ";
    let insertData = [food.name, food.calories];
    return database.raw(insertQuery, insertData);
  },

  deleteFood: (id) => {
    let deleteQuery = "DELETE FROM foods WHERE id = ?";
    return database.raw(deleteQuery, [id]);
  },

  editFood: (food, num) => {
    let id = num;
    let updateDatabase = `UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *`;
    let insertName = food.name;
    let insertCalories = food.calories;
    return database.raw(updateDatabase, [insertName, insertCalories, num]);
  },

  all: () => {
    let getAllQuery = 'SELECT * FROM foods';
    return database.raw(getAllQuery).then(response => response.rows)
  }
}
