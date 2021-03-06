const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const cors = require('cors');
const FoodsController = require('./lib/controllers/foods-controller')
const MealsController = require('./lib/controllers/meals-controller')

app.use(cors( { origin: '*' } ))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self';

app.use('/api/v1/foods/', FoodsController)
app.use('/api/v1/meals/', MealsController)

app.get('/', function(request, response){
  response.send(app.locals.title);
});

if(!module.parent) {
  app.listen(app.get('port'), function(){
    console.log(app.locals.title + ' is running on ' + app.get('port'))
  });
}

module.exports = app;
