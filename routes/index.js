var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/middleware/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage');
});

// dashboard Page
router.get('/dashboard', (request, response) =>{
  response.render('dashboard',{
    username: request.user.email
  })
  console.log(request.user)
});
module.exports = router;
