var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessages } = require("./public/javascripts/dataStructure")
// let test = new AuthorisationRequest("Test1", "Test2")
// test.Username - This is an example of importing and using the data structure factory. Ask if you big confuse - Nyk

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var ircRouter = require('./routes/irc');

var MessageStructure = require("../Utils/messageStructure");
const IRC = require('./public/javascripts/ircClient');

let username = "Nyk"
let ircClient = new IRC("ws://localhost:8080", username);
let messagesList = [new MessageStructure(new Date(Date.now()), "Test1", username, "Someone1").getMessage()];


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
