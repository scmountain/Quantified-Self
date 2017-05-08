const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Sweet Baby Ray\'s BBQ', 95, new Date])
.then(() => {
    database.raw('SELECT * FROM foods').then((data) => {
      console.log(data.rows)
      process.exit();
    })
  })
