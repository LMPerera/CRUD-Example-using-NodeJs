const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const app = express();
const port = 5050;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mtit');
const db = mongoose.connection;

db.once('open',function(){
  console.log('Conntected to mongoDB');
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/adduser',function(req,res){
  res.render('addUser');
});

app.post('/adduser',function(req,res){

  let user = new User({
    name: req.body.name,
    age: req.body.age
  });
  user.save(function(err) {
    if(err){console.log(err);}
    res.redirect('/');
  });
});

app.get('/',function(req,res) {

  User.find({},function(err,user){
    if(err){console.log(err);}
    res.render('viewUser',{
      users : user
    });
  });
});

app.get('/edituser/:id',function(req,res) {

  User.findById(req.params.id,function(err,user){
    if(err){console.log(err);}
    res.render('editUser',{
      users : user
    });
  });
});

app.post('/edituser/:id',function(req,res){

  let user = {};

  user.name= req.body.name,
  user.age= req.body.age

  let query = {_id:req.params.id}

  User.update(query,user,function(err) {
    if(err){console.log(err);}
    res.redirect('/')
  });
});

app.get('/deleteuser/:id',function(req,res) {

  let query = {_id:req.params.id}

  User.remove(query,function(err) {
    if(err){console.log(err);}
    res.redirect('/')
  });
});

app.listen(port,function(){
  console.log("listening to port : " + port);
});

// app.get('/',function(req,res){
//   res.render('addUser',{name:'Madu'});
// });
//
// app.get('/user/:id',function(req,res){
//   res.send(req.params.id);
// });
//
// app.post('/user',function(req,res){
//   res.send(req.body.name);
// });
