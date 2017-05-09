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

module.exports = {
  show: show
}