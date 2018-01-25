//configuring the strategies for passport
'use strict'

const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
require('dotenv').config()

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  // LOCAL SIGNUP =============================================================
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({ 'email': email }, function(err, user) {
          if (err) {
            return done(err)
          } if (user) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That email is already taken.')
            )
          } else {
            const newUser = new User()
            newUser.email = email.trim()
            newUser.password = newUser.generateHash(password.trim())
            newUser.name = req.body.name.trim()

            newUser.save(function(err, user) {
              if (err) throw err

              const payload = {
                sub: user._id
              }

              // create a token string
              const token = jwt.sign(payload, process.env.JWT_SECRET)
              const data = {
                name: user.name
              }

              return done(null, token, data)
            })
          }
        })
      }
    )
  )

  // LOCAL LOGIN =============================================================

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
      },
      function(req, email, password, done) {
        const userData = {
          email: email.trim(),
          password: password.trim()
        }
        User.findOne({ email: userData.email }, function(err, user) {
          if (err) { return done(err) }
          if (!user) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'No user found.')
            )
          }
          if (!user.validPassword(password)) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'Oops! Wrong password.')
            )
          }
          const payload = {
            sub: user._id
          }

          // create a token string
          const token = jwt.sign(payload, process.env.JWT_SECRET)
          const data = {
            name: user.name
          }

          return done(null, token, data)
        })
      }
    )
  )
}
