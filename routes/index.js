var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/middleware/auth');
//TODO: add looby as room zero to array
const rooms = {};
//rooms:0 is lobby messages
/* GET home page. */
router.get('/', forwardAuthenticated, function (req, res, next) {
  res.render('homepage', { rooms: rooms });
});

router.get('/lobby', ensureAuthenticated, function (req, res, next) {
  res.render('lobby');
  console.log("index rooms", rooms)
});

// dashboard Page
router.get('/dashboard', ensureAuthenticated, (request, response) => {
  response.render('dashboard', {
    username: request.user.username,
    userId: request.user.id
  })

});

module.exports = router;
