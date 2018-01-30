var express = require('express')
var validator = require('validator')
var passport = require('passport')

var router = express.Router()

// @param {object} payload - the HTTP body message
// @returns {object} The result of validation. Object contains a boolean
// validation result, errors tips, and a global message for the whole form.

function validateSignupForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 4
  ) {
    isFormValid = false
    errors.password = 'Password must have at least 4 characters.'
  }

  if (
    !payload ||
    typeof payload.name !== 'string' ||
    payload.name.trim().length === 0
  ) {
    isFormValid = false
    errors.name = 'Please provide your name.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateLoginForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    payload.email.trim().length === 0
  ) {
    isFormValid = false
    errors.email = 'Please provide your email address'
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false
    errors.password = 'Please provide your password'
  }

  if (!isFormValid) {
    message = 'Check the form for errors'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

// SIGNUP ==============================
router.post('/signup', function(req, res, next) {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  return passport.authenticate('local-signup', function(err, token, userData) {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.json({
          success: false,
          message: err.message,
          errors: {}
        })
      }
      return res.json({
        success: false,
        message: 'Could not process the form',
        errors: {}
      })
    }

    return res.json({
      success: true,
      token,
      user: userData,
      path: `/user/${userData.name}`
    })
  })(req, res, next)
})

// LOGIN ==============================================
router.post('/login', function(req, res, next) {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  return passport.authenticate('local-login', function(err, token, userData) {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.json({
          success: false,
          message: err.message,
          errors: {}
        })
      }
      return res.json({
        success: false,
        message: 'Could not process the form',
        errors: {}
      })
    }
    return res.json({
      success: true,
      token,
      user: userData,
      path: `/user/${userData.name}`
    })
  })(req, res, next)
})

module.exports = router
