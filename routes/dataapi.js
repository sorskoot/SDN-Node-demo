var express = require('express');
var router = express.Router();
var data = require('../data/schedule.json');

router.get('/speakers/:name', function(req, res, next) {
  let result = 
    data.filter(d =>!!d.speaker.filter(n => n.toLowerCase().match(req.params.name.toLowerCase())).length)
  
  res.json(result);
});

module.exports = router;