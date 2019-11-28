var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage');
});

module.exports = router;
