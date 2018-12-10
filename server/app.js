var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var wokersRouter = require('./routes/wokers');
var adminRouter = require('./routes/admin');



var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(session({
  secret: 'bgwd',
  resave:false,
  saveUninitialized:true,
  cookie: {maxAge: 1000*60*60}
}));
app.use(express.static(path.join(__dirname, 'public')));

//中间件
app.use(function (req,res,next) {
  if(req.session.userId || req.session.adminId){
    next();
  }else{
      // console.log("url:"+req.originalUrl);
      if(req.originalUrl=='/users/login'  
       || req.originalUrl=='/admin/login' 
       || req.originalUrl=='/users/userExistence'  
       || req.originalUrl=='/users/forgotPassWord'
       || req.originalUrl=='/admin/submitSuggest'
       || req.originalUrl=='/users/register'){
            next();
      }else{
          res.json({
            status:'10001', 
            msg:'当前未登录',
            result:''
          });
      }
  }
});

app.use('/users', usersRouter);
app.use('/wokers', wokersRouter); 
app.use('/admin', adminRouter);

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
