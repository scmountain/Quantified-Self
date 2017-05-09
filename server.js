const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

const FoodsController = require('./lib/controllers/foods-controller')

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
  FoodsController.show(request, response)
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
