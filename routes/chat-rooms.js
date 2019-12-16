const express = require('express');
const router = express.Router();


const Games = require('../db/games')
const rooms = { }


router.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  // io.emit('room-created', req.body.room)
})

router.get('/', (req,res) =>{
  res.render('currentGame');
})

router.get('/:room', (req, res) => {
  console.log("Room name ", req.params.room)
  if (rooms[req.params.room] == null) {
    
    return res.redirect('/')
  }
  console.log("Room name ", req.params.room)
  //change req.params.room to get game id
  res.render('room', { roomName: req.params.room })
  
})

router.get('/currentGame', (req,res) =>{
  res.render('currentGame')
})
router.post('/createGame', async (request, response) => {
  console.log(request.body)

  const userId = request.session.passport.user;

  const {
    gameName,
    numberPlayers,
  } = request.body;

  const gameId = await Games.create(gameName, userId, numberPlayers);

  console.log("1", gameId.id)

  if (rooms[request.body.room] != null) {
    return response.redirect('/')
  }

  rooms[request.body.room] = { users: {} }
  response.redirect(gameId.id)
  console.log({ gameId, gameName, userId })
  //response.json({ gameId,gameName,userId });
  console.log("users/create ", request.body)
  // Send message that new room was created

  console.log("Rooms", rooms)
  //response.render('homepage');
})

module.exports = router; 