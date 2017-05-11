const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

module.exports = {
  find: (id) => {
    let getQuery = 'SELECT * FROM foods WHERE foods.id = ?'
    return database.raw(getQuery, [id]).then( data => data.rows[0] || undefined  )
  }

  // function insertFood(name, calories) {
  //   return database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, [name, calories, new Date])
  // }

}