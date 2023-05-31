const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
require('./config/passport');

const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', todoRouter);

module.exports = app;
