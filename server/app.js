/*
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var router = require('./routes')(app)

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
*/

var express = require('express');

const bodyParser= require('body-parser');
var app = express();
app.use(function(req, res, next) {
	 res.header("Access-Control-Allow-Origin", "http://121.157.55.240:9999");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	    next();
	});
/*
app.use(function(req, res, next) {
//	  res.header("Access-Control-Allow-Origin", "*");
//	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//	  next();
	 res.setHeader('Access-Control-Allow-Origin', 'http://121.157.22.240:8080');
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	 res.setHeader('Access-Control-Allow-Credentials', true );
	 next();
});
*/
//var db = require('./models/db.js');
//var user = require('./models/user');

const db = require('./models/db.js'); // db 불러오기
const route = require('./routes/route.js');

//app.use(express.static(__dirname + '/app'));

app.use('/', route);
// 에러 처리 부분
app.listen(8080, '121.157.55.240' );
//app.listen(8080, '0.0.0.0', () => {
//  console.log('Express App on port 8080!');
//});

/*
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/users', user.createUsers);
app.get('/users', user.seeResults);
app.delete('/users/:id', user.delete);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/
