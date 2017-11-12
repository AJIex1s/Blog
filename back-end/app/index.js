var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var isProduction = false;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/blog_db');
mongoose.set('debug', true);

require('./models/post');

app.use(require('./routes'));

module.exports = app;
