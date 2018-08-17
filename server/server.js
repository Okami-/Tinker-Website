const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));


