var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var studentAction=require('./routes/studentAction.js')
var gradeAction=require('./routes/gradeAction.js')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//node.js跨域 修改app.js文件拦截所有的请求，修改头部
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "content-type");
//    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//    res.header("X-Powered-By", ' 3.2.1');
//    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == "OPTIONS") {
        res.send("200");
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student',studentAction);
app.use('/grade',gradeAction);

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

module.exports = app;
