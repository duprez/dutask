var express = require('express');
var router = express.Router();
var queriesLogin = require('./login.queries.js');

module.exports = function() {
    app.use('/api', router);

    router.post('/login', (req, res) => {
        // TODO:: Funcionalidad del login que hará la api en caso de logout o login
    });

    router.post('/logout', (req, res) => {
        // TODO
    });
}