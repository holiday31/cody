var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('views', __dirname + '/View');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
	secret: '12sdfwerwersdfserwerwef', //keboard cat (랜덤한 값)
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

http.listen (3000, function() {
    console.log("DDD");
});
app.use(express.static('public'));
app.use('/', require('./Router/index'));
