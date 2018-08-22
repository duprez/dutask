'use strict';

var mongodb = require('mongodb');
var express = require('express');
var config = require('../config/config.js');
var app = express();

let url =  process.env.MONGODB_URI || `mongodb+srv://${config.user}:${config.pass}@${config.host}/${config.db}?retryWrites=true`;

mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('error: ', err);
    }

    const PORT = process.env.PORT || 3000;

    var usersCollection = client.db("dutask").collection('users');

    app.get('/', function(req, res) {
        res.send('Hola mundo!');
    });

    app.get('/users', function (req, res) {
        usersCollection.find({}).toArray(function(err, result) {
            if (err) {
                res.send(err);
            } else if (result.length) {
                res.send(result);
            }
        });
       
    });
      
    app.listen(process.env.PORT || 3000, function () {
        console.log('Example app listening on port' + PORT + '!');
    });

    // client.close();
});