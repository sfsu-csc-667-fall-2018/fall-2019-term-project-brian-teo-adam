const express = require('express');
const router = express.Router();

const passport = require('../config/passport');
const User = require('../db/users');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) =>{
  res.render('login')
} );

// Register Page
router.get('/register', (req, res) =>{
  res.render('register')
})

router.post('/register', (request, response) =>{
  const {username,email,password,password2} = request.body;
  let errors = [];
  
  if (!username || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
    req.flash('error_msg', 'all fields are required')
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
        response.redirect('/dashboard');
        throw new Error('A user is already registered with that email address');
      }
    })
    .then(() => {
      console.log(password)
      console.log(username)
      console.log(email)
      
      return User.create( password,username,email);
    })
    .then(user => {
      request.login(request.body, error => {
        if (error) {
          throw error;
        }
        request.session.save(() => {
          response.redirect('/homepage');
        });
      });
    })
    .catch(function(err) {
      response.json({ error: err.message });
    });
});

// Login
router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports =router;
