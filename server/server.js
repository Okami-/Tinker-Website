var express = require("express");
var port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var index = require('./routes/index');

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});




app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/', index);