const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)
const pry = require('pryjs')

module.exports = {
  find: (day, meal) => {
    let getQuery = `SELECT * from foods
      INNER JOIN meals on foods.id = meals.foods_id
      INNER JOIN diary on diary.id = meals.diary_id
      WHERE diary.day = ? AND meals.meal = ?;`
    let insertData = [day, meal]
    return database.raw(getQuery, insertData).then( data => data.rows || undefined  )
  }
}
