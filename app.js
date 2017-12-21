const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const config = require('./config/database');

require('dotenv').config();

// Connecting to the DB
mongoose.Promise = require('bluebird');

mongoose.connect(config.database, {
  useMongoClient: true
});
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});

// Port Number
const port = process.env.PORT || 8080;

// Init App
var app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Home Route
app.get('/', function(req, res){
  res.render('index');
});

// Route Files
let api = require('./routes/api');
app.use('/api', api);

// Server Listening
app.listen(port, function(){
  console.log('Server started on port' + port);
});
