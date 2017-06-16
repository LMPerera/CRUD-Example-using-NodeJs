const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 8080;

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

//moving to correct database
connection.query('USE mtit');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/adduser',function(req,res){
  res.render('addUser');
});

app.post('/adduser',function(req,res){

  let sql = 'INSERT INTO user SET ?';

  let data = {
    name:req.body.name,
    age:req.body.age
  };

  connection.query(sql, data, function(err) {
    if(err){console.log(err);}
    res.redirect('/')
  })

});

app.get('/',function(req,res) {

  let sql = 'SELECT * FROM user';

  connection.query(sql,function(err,user) {
    if(err){console.log(err);}
    res.render('viewUser',{
      users : user
    });
  });
});

app.get('/edituser/:id',function(req,res) {

  let sql = 'SELECT * FROM user WHERE _id = ?';

  connection.query(sql,[req.params.id],function(err,user) {

    //transform the return value(RowDataPacket object) into string
    var string=JSON.stringify(user);
    //convert this string into the json object.
    var json =  JSON.parse(string);

    if(err){console.log(err);}
    res.render('editUser',{
      users : json[0]
    });
  });
});

app.post('/edituser/:id',function(req,res){

  let sql = 'UPDATE user SET name = ? , age = ? WHERE _id = ?';
  let name = req.body.name;
  let age = req.body.age;
  let id = req.params.id;

  connection.query(sql, [name,age,id], function(err) {
    if(err){console.log(err);}
    res.redirect('/')
  });
});

app.get('/deleteuser/:id',function(req,res) {

  let sql = 'DELETE FROM user WHERE _id = ? '
  connection.query(sql,[req.params.id], function(err) {
    if(err){console.log(err);}
    res.redirect('/')
  });
});

app.listen(port,function(){
  console.log("listening to port : " + port);
});
