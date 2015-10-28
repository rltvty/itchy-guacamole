var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Load all controllers, once we have some
/*
fs.readdirSync('./controllers/').forEach(function(file) {
    var path = require('./controllers/' + file);
    path.controller(app)
});
*/

//Always serve the index, let react sort out the routing.
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
