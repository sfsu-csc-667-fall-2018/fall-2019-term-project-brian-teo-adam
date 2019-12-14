const express = require('express');
const router = express.Router();

const passport = require('../auth');
const User = require('../db/users');


router.post('/createGame',(request,response) =>{
    response.render('homepage');
  })


  module.exports =router;