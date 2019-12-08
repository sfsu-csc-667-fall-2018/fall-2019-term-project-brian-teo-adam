const express = require('express');
const router = express.Router();

router.get('/lobby', (req, res, next) => {
    db.query('SELECT * FROM GAMES')
    .then(games =>{
      res.render("lobby",{
        games: games
      })
    })
    .catch(error =>{
      res.send(error);
    })
  });
