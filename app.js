var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var feedbackRouter = require('./routes/feedback');
var petRouter = require('./routes/pet');
var imageRouter = require('./routes/image');
var favouriteRouter = require('./routes/favourite');
var categoryRouter = require('./routes/category');
var speciesRouter = require('./routes/species');
var orderRouter = require('./routes/order');
var orderdetailRouter = require('./routes/orderdetail');
var payRouter = require('./routes/pay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//connect database
mongoose
  .connect("mongodb+srv://khaintps35811:261002@petappapi.xtmlkbx.mongodb.net/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>>> DB Connection Error: ", err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/feedback',feedbackRouter)
app.use('/pet',petRouter)
app.use('/image',imageRouter)
app.use('/favourite',favouriteRouter)
app.use('/category',categoryRouter)
app.use('/species',speciesRouter)
app.use('/order',orderRouter)
app.use('/orderdetail',orderdetailRouter)
app.use('/pay',payRouter)

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
