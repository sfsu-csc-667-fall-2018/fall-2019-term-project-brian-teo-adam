if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}
//consolidate for using more than one view engine
const engines = require('consolidate');
const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const passport = require('./auth')
const socketIo = require('./socket')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/tests');
const roomsRouter =require('./routes/chat-rooms')

const app = express();

// Express session
app.use(
    session({
        key: 'user_sid',
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie:{
            expires:600000
        }
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', engines.ejs);
app.engine('jade', engines.jade);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testRouter);
app.use('/room', roomsRouter)

// EJS
// app.use(expressLayouts);
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({extended: true}));

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

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
    console.log(err.status)
    console.log(" ");
    console.log(err.message)
    res.render('error.jade');
});

module.exports = app;
