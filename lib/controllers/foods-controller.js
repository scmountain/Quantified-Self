var pry = require('pryjs')
const Food = require('../models/food')
const FoodsRouter = require('express').Router();



  FoodsRouter.get('/:id', (request, response) => {
      Food.find(request.params.id)
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

  FoodsRouter.post('/', (request, response) => {
    Food.create(request.body)
      .then( data => {
        response.sendStatus(201);
      })
      .catch( error => {
        response.status(500).send({ error: err.message });
      });
  });
  // function create (request, response) {
  //   var name = request.body.name
  //   var calories = request.body.calories

  //   var whatever = Food.insertFood(name, calories)
  //   eval(pry.it)
  //   // .then((data) => {
  //   //       if (data == null) {
  //   //         response.sendStatus(404)
  //   //       } else {
  //   //         response.json(food)
  //   //       }
  //   // })
  // }


module.exports = FoodsRouter;
