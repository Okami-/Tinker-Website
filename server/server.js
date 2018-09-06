const express = require("express");
const app = express();
const port = process.env.PORT || 8085;
const path = require('path');
const passport = require('passport');
const ConnectRoles = require('connect-roles');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const routes = require('./routes/routes');
var redis = require('redis');

// DB connection ======================================================================
client = redis.createClient();

/// middleware ======================================================================
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  resave: true,
  saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session()); 

// routes ======================================================================
app.use('/', routes);

// launch ======================================================================
app.listen(port, () => console.log(`Listening on port ${port}`));
