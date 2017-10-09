const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/users', function(req, res){
    //res.send('Welcome to the users page');
    MongoClient.connect("mongodb://localhost:27017/mega_app", function (err, db) {
        
        db.collection('users', function (err, collection) {
            
             collection.find().toArray(function(err, items) {
                if(err) throw err;    
                res.render('users.pug', {users: items});
                db.close();         
            });
            
        });
                    
    });
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/user', urlencodedParser, function(req, res){
    MongoClient.connect("mongodb://localhost:27017/mega_app", function (err, db) {
        db.collection('users', function (err, collection) {
            
            collection.insert({name: req.body.name, age: 20 });         
        });
        db.close();        
    });
    res.redirect('/users')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})