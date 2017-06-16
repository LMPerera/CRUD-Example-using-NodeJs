const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
, assert = require('assert');
const app = express();
const port = 5050;

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Connection URL
var url = 'mongodb://localhost:27017/mtit1';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});

app.listen(port,function(){
  console.log("listening to port : " + port);
});
