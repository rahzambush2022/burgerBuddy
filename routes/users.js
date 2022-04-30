const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET users/adminLogin listing. */
router.get('/adminLogin', function(req, res, next) {
  res.render('adminLogin');
});

module.exports = router;

/* GET users/adminLogin listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
