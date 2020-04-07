var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session 
app.use(session({
  secret: '$#',
  name:'seesionId'
  resave: false,
  saveUninitialized: false,
  cookie: { 
	  maxAge : 1000*60*60
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api2/users', usersRouter);

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

/* //测试数据库代码
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '000000',
	database: 'user',
	port: 3306
});

connection.connect();

var sql = 'SELECT * from user_login';

connection.query(sql, (err,result)=>{
	if(err){
		console.log('数据库连接失败');
		console.log(err);
		return ;
	}
	//console.log(result); //数据库查询结果
	console.log(JSON.parse(JSON.stringify(result)));
});
app.get('/',(req,res)=>{
	res.send(str);
});
connection.end(); */




module.exports = app;
