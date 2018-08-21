'use strict';

const mongodb = require('mongodb');
const express = require('express');
const nconf = require('nconf');

var app = express();

nconf.argv().env().file('keys.json');

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');

let uri = `mongodb+srv://${user}:${pass}@${host}/${nconf.get('mongoDatabase')}?retryWrites=true`;

mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
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