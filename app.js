var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const cors = require('cors');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todoRouter = require('./routes/todoslist');

const ejs = require('ejs');
ejs.delimiter = '/';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", 'data:', 'https://www.google-analytics.com'],
      connectSrc: ["'self'", 'https://cdnmd.global-cache.online'],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/todolist',(req, res, next) => {
  
  if(req.query.msg === 'fail') {
    res.locals.msg = `빈 공백은 사용 불가합니다.`;
  }else{
    // undefined로 인한 오류 방지....
    res.locals.msg = ``;
  }
  next();
})
app.use('/todolist',todoRouter);


















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
