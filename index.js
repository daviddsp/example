var express = require('express');
var app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://test:123456789@states.crajuyvaenza.us-west-2.rds.amazonaws.com:5432/data");

//Estados
app.get('/allStates', function (req, res) {

  db.any('select * from estados')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL estados'
          });
      })
      .catch(function (err) {
        return next(err);
      });
});

//Parroquias
app.get('/town/cod_edo/:cod_edo', function (req, res) {

  var edoID = req.params.cod_edo;

  db.any('select * from municipios where cod_edo = $1', edoID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL town'
          });
      })
      .catch(function (err) {
        return next(err);
      });
});

//MUnicipios
app.get('/parishes/cod_mun/:cod_mun', function (req, res) {

  var townID = req.params.cod_mun;

  db.any('select * from parroquias where cod_mun = $1', townID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL parishes'
          });
      })
      .catch(function (err) {
        return next(err);
      });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
