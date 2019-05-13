var express = require('express');
var router = express.Router();
var axios = require('axios');

const API_URL = "https://highett.ddns.net"

router.get('/status', function(req, res, next) {
  axios.post(`${API_URL}/page1`)
    .then(result => res.send(result.data))
    .catch(err => {
      // TODO: this needs to be handled more generally
      res.send({ error_code: err.code })
    })
});

router.put('/enabled', function(req, res, next) {
  axios.post(`${API_URL}/page1`, 'enable=true')
    .then(result => res.send({}))
    .catch(err => {
      res.send({ error_code: err.code })
    })
});

router.delete('/enabled', function(req, res, next) {
  axios.post(`${API_URL}/page1`, 'enable=false')
    .then(result => res.send({}))
    .catch(err => {
      res.send({ error_code: err.code })
    })
});

router.patch('/temperature', function(req, res, next) {
  axios.post(`${API_URL}/page1`, `sp=${req.body.temperature}`)
    .then(result => res.send({}))
    .catch(err => {
      res.send({ error_code: err.code })
    })
});


router.post('/schedule', function(req, res, next) {
  axios.post(`${API_URL}/schedule`, { on_time: req.body.onTime })
    .then(result => res.send({ result: result.data }))
    .catch(err => {
      res.send({ error_code: err.code })
    })
})

router.delete('/schedule', function(req, res, next) {
  axios.delete(`${API_URL}/schedule`, {})
    .then(result => res.send({ result: result.data }))
    .catch(err => {
      res.send({ error_code: err.code })
    })
})

module.exports = router;
