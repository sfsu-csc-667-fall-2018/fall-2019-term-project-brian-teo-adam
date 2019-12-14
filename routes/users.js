const express = require('express');
const router = express.Router();

const passport = require('../auth');
const User = require('../db/users');
const Games = require('../db/games');

// Login Page
router.get('/login', (request, response) =>{
  response.render('login')
} );

// Register Page
router.get('/register', (request, response) =>{
  response.render('register')
});

router.post('/register', (request, response) =>{
  const {username,email,password,password2} = request.body;
  let errors = [];
  
  if (!username || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
    //req.flash('error_msg', 'all fields are required')
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  User.findByEmail(email)
    .then(User => {
      if (User.length !== 0) {
        response.redirect('/users/login');
        throw new Error('A user is already registered with that email address');
      }
    })
    .then(() => {
      return User.create(password,username,email);
    })
    .then(user => {
      request.login(request.body, error => {
        if (error) {
          throw error;
        }
        request.session.save(() => {
          response.redirect('/dashboard');
        });
      });
    })
    .catch(function(err) {
      response.json({ error: err.message });
    });
});

// Login
router.post('/login', (request, response, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(request, response, next);
});

// Logout
router.get('/logout', (request, response) => {
  request.logout();
 // request.flash('success_msg', 'You are logged out');
  response.redirect('/users/login');
});

router.post('/createGame', async (request,response) =>{
  console.log(request.body)
  // const {
  //   id: userId
  // } = request.session.passport;
  const userId = request.session.passport.user;
  const {
      gameName,
      numberPlayers,
  } = request.body;
  const gameId = await Games.create(gameName,userId,numberPlayers);
  console.log(gameId)
  response.json({ gameId,gameName,userId });
  //response.render('homepage');
})
module.exports =router;
