const express = require('express');
const registros = require('./registrosRoute.js');

// use() metodo express para receber midware
module.exports = app => {
    app.use(
        express.json(),
        registros,
    );
};
