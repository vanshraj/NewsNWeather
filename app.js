var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var index = require('./routes/index');
var api = require('./routes/api');
var user = require('./routes/users');
var mongoose = require('mongoose');
var config = require('config');
var cors = require('cors');
var dbOptions = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
};

require('dotenv').config()
var dbUrl = config.DBHost;

//connect db
mongoose.connect(dbUrl, dbOptions , function(err, res){
  if(err)
    console.log('DB connection failed: '+err);
  else if (config.useLogger)
    console.log('DB connection running: '+dbUrl);
});

//setup server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if(config.useLogger){
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);//default index
app.use('/', user);//user session
app.use('/', api);//api

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('Server started on 3000');
module.exports = app;
