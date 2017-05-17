var pry = require('pryjs')
const Meal = require('../models/meal')
const MealsRouter = require('express').Router();

  MealsRouter.get('/', (request, response) => {
      Meal.find(request.query.day, request.query.meal)
        .then((data) => {
          if (data) {
            response.send(data)
          } else {
            response.status(404).send( { error: 'Resource not found' } )
          }
        })
        .catch((error) => {
          response.status(500).send( { error: error.message } )
        })
      })

module.exports = MealsRouter;
