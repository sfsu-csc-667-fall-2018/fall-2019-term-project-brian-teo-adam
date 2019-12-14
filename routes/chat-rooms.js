const express = require('express');
const router = express.Router();

const passport = require('../auth');
const User = require('../db/users');


const rooms = { }

app.post('/room', (req, res) => {
    if (rooms[req.body.room] != null) {
      return res.redirect('/')
    }
    rooms[req.body.room] = { users: {} }
    res.redirect(req.body.room)
    // Send message that new room was created
    io.emit('room-created', req.body.room)
  })

  app.get('/:room', (req, res) => {
    if (rooms[req.params.room] == null) {
      return res.redirect('/')
    }
    res.render('room', { roomName: req.params.room })
  })
  
  server.listen(3000)