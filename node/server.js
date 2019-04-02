//adding express package for http connections
var express = require('express');
var app = express();
var cors = require('cors');

//adding mongoose db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BD_Weather', {useNewUrlParser: true});

//add bodyparser to accept in any i/p lang
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//adding cross origin
  app.use(cors());
app.use(cors({
    options: '*',
    'Access-Control-Allow-Origin': '*'
    }));
app.options('*', cors()); 

require('./routes/app_routing')(app);

//add port on which app is 
var port = process.env.PORT || 8080
app.listen(port);
console.log('Application running on port ' +port);