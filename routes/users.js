const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../db/index')
const User = require('../migrations/Users')
const Sequelize = require('sequelize');


// Login Page
router.get('/login', (req, res) =>{
  res.render('login')
} );

// Register Page
router.get('/register', (req, res) =>{
  res.render('register')
} )
var queryString = "INSERT INTO Users ( password, username,email) VALUES (request.body.password, request.body.username,request.body.email)";
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
  console.log(queryString)
    if(errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email
        });
    }else{
        db.query(queryString,(errors,res) => {
            console.log(errors,res)
            db.end()
        });
    }
});


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


module.exports =router;



// User.findOne({
//     where:{
//         username: username
//     }
// })
//     .then(user => {
//         if (user != undefined) {
//             console.log("User taken")
//         } else {
//             bcrypt.hash(request.body.password, salt, (err, hash) => {
//                 if (err) throw err;
//                 let passWord = hash;
//                 User.create({
//                     username: username,
//                     email: email,
//                     password: passWord
//                 })
//             })
//                 .then(() => {
//                     console.log("Created user")
//                 })
//         }
//     })
//     .catch(err =>{
//         console.log(err)
//     })