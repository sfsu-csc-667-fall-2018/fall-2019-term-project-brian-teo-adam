const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../db/users/index');
passport.serializeUser((user, done) => {
  console.log("5",user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id)
  User.findById(id).then(({ id, email, username }) => done(null, { id, email, username}));
  console.log("6");
});

const strategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  (email, password, done) => {
    console.log("7")
    User.findByEmail(email.toLowerCase()).then(([user, ..._]) => {
      if (user !== undefined && bcrypt.compareSync(password, user.password)) {
        console.log("8")
        return done(null, { id: user.id, email: user.email});
      } else {
        return done('That user was not found.', false);
      }
    });
  }
);


passport.use(strategy);
module.exports = passport;