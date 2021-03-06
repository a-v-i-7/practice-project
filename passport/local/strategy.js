/**
 * Requiring LocalStrategy from passport
 */

const LocalStrategy = require("passport-local").Strategy;

/**
 * Importing the environment variables
 */

require("dotenv").config();
const bcrypt = require("bcryptjs");

/**
 * Passport options for the local jwt strategy
 */

const options = {
  usernameField: process.env.USERNAME_FIELD,
  password: process.env.PASSWORD_FIELD
};

/**
 * Requiring passport
 */

const passport = require("passport");
const { USER } = require("../../schema/index");

/**
 * Using passport Local Strategy
 */

passport.use(
  new LocalStrategy(options, async (username, password, done) => {
    console.log(username, password);
    await USER.findOne({ username })
      .then(user => {
        if (user) {
          console.log(user);
          /**
           * Comparing the password using bcrypt.compare()
           */
          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) done(err);
            console.log(isMatch);
            if (isMatch) {
              console.log(done(null,user)); 
              return done(null, user);}
            return done(null, false);
          });
        }
      })
      .catch(err => done(err));
  })
);
