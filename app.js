'use strict'

require('dotenv').config()

const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),

      srcDir = __dirname + "/src/"

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(bodyParser.urlencoded({
    extended: true
}))
// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyParser.json());
app.use(express.static(srcDir));

module.exports = app;