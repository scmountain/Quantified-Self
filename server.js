var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var md5 = require('md5');

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
  var message = app.locals.foods[id];

  if(!message){ return response.sendStatus(404) }

  response.json({ id: id, message: message});
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
