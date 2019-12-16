const express = require('express');
const router = express.Router();

router.get('/creategame', (req, res, next) => {
    res.render('creategame');
  });