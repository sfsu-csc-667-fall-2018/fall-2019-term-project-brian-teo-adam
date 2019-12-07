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
  const {username,email,password,password2} = request.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  console.log(request.body)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            let passWord = hash;
            console.log(hash);
              db.one('INSERT INTO users_table (username, email, password) VALUES(username, email, password)', {
                  username:username,
                  email:email,
                  password: passWord
              })
                  .then(res => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
          });
        });
    });

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


module.exports = router;
