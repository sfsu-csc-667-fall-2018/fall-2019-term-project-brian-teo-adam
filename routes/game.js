const express = require('express');
const router = express.Router();

router.get('/game', (req, res, next) => {
    console.log("gameid: "+ req.query.id);
    res.render("game")
    });