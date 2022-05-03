var express = require('express');
var router = express.Router();

/* GET users adminLogin listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/adminLogin', function (req, res, next) {
  res.render('adminLogin');
});
router.get('/Users', function (req, res, next) {
  res.render('Users');
});

module.exports = router;