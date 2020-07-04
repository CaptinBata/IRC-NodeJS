var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var ircRouter = require('./routes/irc');
var MessageStructure = require("./public/javascripts/messageStructure");
const IRC = require('./public/javascripts/ircClient');

let ircClient = new IRC("ws://82.13.124.97");
let messagesList = [new MessageStructure(new Date(Date.now()), "Test1", "Nyk1", "Someone1").getMessage()];
let username = "Nyk"

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.ircClient = ircClient;
  req.messagesList = messagesList;
  req.username = username
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/irc', ircRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;