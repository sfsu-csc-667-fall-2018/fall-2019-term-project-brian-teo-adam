const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../db/index')

// Login Page
router.get('/login', (req, res) =>{
  res.render('login')
} );

// Register Page
router.get('/register', (req, res) =>{
  res.render('register')
} )

router.post('/register', (request, response) =>{
  console.log(request.body)
})

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});







module.exports = router;
