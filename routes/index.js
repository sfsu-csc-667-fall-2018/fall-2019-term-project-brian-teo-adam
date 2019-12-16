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

// router.post('/room', (req, res) => {
//   if (rooms[req.body.room] != null) {
//     return res.redirect('/')
//   }
//   rooms[req.body.room] = { users: {} }
//   res.redirect(req.body.room)
//   // Send message that new room was created
//   io.emit('room-created', req.body.room)
// })

// router.get('/:room', (req, res) => {
//   if (rooms[req.params.room] == null) {
//     return res.redirect('lobby')
//   }
//   res.render('games', { roomName: req.params.room })
// })



module.exports = router;
