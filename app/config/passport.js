//configuring the strategies for passport
'use strict'

const jwt = require('jsonwebtoken')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
require('dotenv').config()

module.exports = function(passport) {
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
        User.findOne({ email: email }, function(err, user) {
          if (err) {
            return done(err)
          }
          if (user) {
            const error = new Error('This e-mail is already in use')
            error.name = 'IncorrectCredentialsError'
            return done(error)
          }

          const userName = req.body.name.trim()
          User.findOne({ name: userName }, function(err, user) {
            if (err) {
              return done(err)
            }
            if (user) {
              const error = new Error('This name is already in use')
              error.name = 'IncorrectCredentialsError'
              return done(error)
            }

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
          })
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
          if (err) {
            return done(err)
          }
          if (!user) {
            const error = new Error('Incorrect email')
            error.name = 'IncorrectCredentialsError'
            return done(error)
          }
          if (!user.validPassword(password)) {
            const error = new Error('Incorrect password')
            error.name = 'IncorrectCredentialsError'
            return done(error)
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
