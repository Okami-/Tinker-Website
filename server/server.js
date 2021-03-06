const express = require("express");
const app = express();
const port = process.env.PORT || 8085;
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const routes = require('./routes/routes');
const redis = require('redis');
const { promisify } = require('util');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lightblog');
mongoose.set('debug', true);

// Add models
// Add routes

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// DB connection ======================================================================
client = redis.createClient();
getAsync = promisify(client.get).bind(client);
client.on('error', (err) => {
  console.log(`Redis Error ${err}`);
});

client.set('usersDatabase', JSON.stringify([
  {
    id: 1,
    email: 'richiebkr@gmail.com',
    password: '$2a$04$4yQfCo8kMpH24T2iQkw9p.hPjcz10m.FcWmgkOhkXNPSpbwHZ877S',
    userName: 'rbaker',
  }
]), redis.print);


/// middleware ======================================================================
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 20 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// routes ======================================================================
app.use('/', routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
// launch ======================================================================
app.listen(port, () => console.log(`Listening on port ${port}`));
