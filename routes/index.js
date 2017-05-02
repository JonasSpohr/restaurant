var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ChooseRestaurant - The best way to choose where to have lunch ;)' });
});

module.exports = router;
