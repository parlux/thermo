var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/status', function(req, res, next) {
  axios.post(`${process.env.API_URL}/status`)
    .then(result => res.send(result.data))
    .catch(err => {
      // TODO: this needs to be handled more generally
      res.send({ error_code: err.code })
    })
});

router.put('/enabled', function(req, res, next) {
  axios.post(`${process.env.API_URL}/update`, 'enable=1')
    .then(result => res.send({}))
    .catch(err => {
      res.send({ error_code: err.code })
    })
});

router.delete('/enabled', function(req, res, next) {
  axios.post(`${process.env.API_URL}/update`, 'enable=0')
    .then(result => res.send({}))
    .catch(err => {
      res.send({ error_code: err.code })
    })
});

router.patch('/temperature', function(req, res, next) {
  axios.post(`${process.env.API_URL}/update`, `sp=${req.body.temperature}`)
    .then(result => res.send({}))
    .catch(err => {
      res.send({ error_code: err.code })
    })
});

module.exports = router;
