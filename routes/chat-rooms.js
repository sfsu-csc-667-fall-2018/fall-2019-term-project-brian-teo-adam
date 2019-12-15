const express = require('express');
const router = express.Router();

const passport = require('../auth');
const User = require('../db/users');


router.post('/room', (req, res) => {
    if (rooms[req.body.room] != null) {
      return res.redirect('/')
    }
    rooms[req.body.room] = { users: {} }
    res.redirect(req.body.room)
    // Send message that new room was created
    io.emit('room-created', req.body.room)
  })

  router.get('/:room', (req, res) => {
    if (rooms[req.params.room] == null) {
      return res.redirect('/')
    }
    //change req.params.room to get game id
    res.render('room', { roomName: req.params.room })
  })

  router.post('/createGame', async (request,response) =>{
  console.log(request.body)
  
  const userId = request.session.passport.user;
 
  const {
      gameName,
      numberPlayers,
  } = request.body;
  
  const gameId = await Games.create(gameName,userId,numberPlayers);
  
  console.log(gameId)
  
  response.json({ gameId,gameName,userId });
  
  if (rooms[request.body.room] != null) {
    return res.redirect('/')
  }
  rooms[request.body.room] = { users: {} }
  response.redirect(request.body.room)
  console.log("users/create ",request.body.room)
  // Send message that new room was created
  io.emit('new-game', request.body.room)
  console.log("Rooms", rooms)
  //response.render('homepage');
})

  module.exports = router; 