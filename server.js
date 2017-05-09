const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

const environment   = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database      = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self';
app.locals.foods = {
  wowowow: 'I am a banana'
}

app.get('/', function(request, response){
  response.send(app.locals.title);
});

app.get('/api/foods/:id', function(request, response){
  var id = request.params.id

  database.raw('SELECT * FROM foods WHERE foods.id = ? LIMIT 1', [id])
    .then((data) => {
      let food = data.rows[0]
      if (food == null) {
        response.sendStatus(404)
      } else {
        response.json(food)
      }
    });
});

app.post('/api/foods', function(request, response){
  var id = Date.now()
  var message = request.body.message

  if (!message) {
    return response.status(422).send({
      error: "No message property provided"
    });
  }

  app.locals.foods[id] = message
 
  response.status(201).json({ id, message })
});

if(!module.parent) {
  app.listen(app.get('port'), function(){
    console.log(app.locals.title + ' is running on ' + app.get('port'))
  });
}

module.exports = app;
