/*
const mongoose = require('mongoose');
console.log("test");
module.exports = () => {
  function connect() {
    mongoose.connect('localhost:27017', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  console.log("test1");
  connect();
  mongoose.connection.on('disconnected', connect);
//  require('./user.js'); // user.js는 나중에 만듭니다.
};
*/
/*
var mongoose = require('mongoose');  
var User = new mongoose.Schema({
	name: { type: String },
	age: Number,
	email: String
});

module.exports =  mongoose.model('Person', User);  
//module.exports = mongoose.model("User", userSchema);

mongoose.connect('mongodb://localhost/database_mongo'); 

console.log('we are connected');
//var express     = require('express');
//var app         = express();
//var bodyParser  = require('body-parser');
//var mongoose    = require('mongoose');
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database_mongo');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
