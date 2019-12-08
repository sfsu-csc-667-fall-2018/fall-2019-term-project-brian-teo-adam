const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../db/users/index');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(({user_id,email}) => done(null,{id, email})); 
});

const strategy = new LocalStrategy(
  {usernameField: 'email',passwordField:'password'},(email,password,done) =>{User.findByEmail(email.toLowerCase())
    .then(([user, ..._]) => {
    if (user !== undefined && bcrypt.compareSync(password, user.password)) {
      return done(null, { id: user.id, email: user.email });
    } else {
      return done('That user was not found.', false);
    }
  });
}
);

passport.use(strategy);

module.exports = passport;


// module.exports = function(passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//       console.log("passport")
//       console.log(email);
//       // Match user
//       User.findOne({
//         email: email
//       }).then(user => {
//         if (!user) {
//           return done(null, false, { message: 'That email is not registered' });
//         }

//         // Match password
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) throw err;
//           if (isMatch) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: 'Password incorrect' });
//           }
//         });
//       });
//     })
//   );
  
 

  
// };