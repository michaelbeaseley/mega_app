const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/users', function(req, res){
    //res.send('Welcome to the users page');
    MongoClient.connect("mongodb://localhost:27017/mega_app", function (err, db) {
        
        db.collection('users', function (err, collection) {
            
             collection.find().toArray(function(err, items) {
                if(err) throw err;    
                console.log(items);         
            });
            
        });
                    
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})