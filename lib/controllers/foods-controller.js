var pry = require('pryjs')
const Food = require('../models/food')

function show (request, response) {
    Food.find(request.params.id)
      .then((data) => {
        let food = data.rows[0]
        if (food == null) {
          response.sendStatus(404)
        } else {
          response.json(food)
        }
    });
}

function create (request, response) {
  var name = request.body.name
  var calories = request.body.calories

  var whatever = Food.insertFood(name, calories)
  eval(pry.it)
  // .then((data) => {
  //       if (data == null) {
  //         response.sendStatus(404)
  //       } else {
  //         response.json(food)
  //       }
  // })
}

module.exports = {
  show: show,
  create: create
}