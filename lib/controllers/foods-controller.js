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

  FoodsRouter.get('/', (request, response) => {
      Food.all()
        .then((data) => {
            response.send(data)
        })
        .catch((error) => {
          response.status(500).send( { error: error.message } )
        })
      })

  FoodsRouter.post('/', (request, response) => {
    Food.create(request.body)
    .then( data => {
        response.send(data);
      })
      .catch( error => {
        response.status(500).send({ error: error.message });
      });
  });

  FoodsRouter.delete('/:id', (request, response) => {
    Food.find(request.params.id)
    .then((data) => {
      if (data) {
        Food.deleteFood(data.id)
        .then( data => {
          response.sendStatus(201);
        })
        .catch( error => {
          response.status(500).send({ error: error.message });
        });
      } else {
        response.status(404).send( { error: 'Resource not found' } )
      }
    })
    .catch((error) => {
      response.status(500).send( { error: error.message } )
    })
  })

    FoodsRouter.put('/:id', (request, response) =>{
      Food.find(request.params.id)
        .then((data) => {
          if (data) {
            Food.editFood(data.id)
            .then((data) => {
              if (data) {
                response.send(data)
              } else {
                response.status(404).send( { error: 'Resource not found' } )
              }
            })
          } else {
            response.status(404).send( { error: 'Resource not found' } );
          }
        })
      .catch( error => {
        response.status(500).send({ error: error.message });
      })
    });


module.exports = FoodsRouter;
