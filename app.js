// Hide your Mongo connection variables 
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT;
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const burgerRouter = require('./routes/burger');
// const toppingsRouter = require('./routes/toppings');
// const extrasRouter = require('./routes/extras'); //sides and drinks

// Mongo DB Connection
mongoose.connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(res => console.log("MongoDB connected!"))
  .catch(err => console.log(err))

hbs.registerPartials(__dirname + '/views/partials');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  httpOnly: true,
  secure: true,
  resave: true,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/burger', burgerRouter);
// app.use('/topping', toppingsRouter);
// app.use('/extras', extrasRouter);

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