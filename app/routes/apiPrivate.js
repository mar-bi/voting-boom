var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt-nodejs')
var Poll = require('../models/poll.js')
var User = require('../models/user.js')

const home = process.env.BASE_URL

// @param {object} payload - the HTTP body message
// @returns {object} The result of validation. Object contains a boolean
// validation result, errors tips, and a global message for the whole form.

function validatePasswordForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  //console.log(payload)

  if (
    !payload ||
    typeof payload.oldPassword !== 'string' ||
    payload.oldPassword.trim().length < 4
  ) {
    isFormValid = false
    errors.oldPassword = 'Password must have at least 4 characters'
  }

  if (
    !payload ||
    typeof payload.newPassword !== 'string' ||
    payload.newPassword.trim().length < 4
  ) {
    isFormValid = false
    errors.newPassword = 'Password must have at least 4 characters'
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

//PROTECTED POST--------------------------------------------------
// create poll
router.post('/addPoll', function(req, res) {
  const newPoll = req.body
  // enforce uniqueness of pairs {author: pollname}
  Poll.find({ author: newPoll.author, pollname: newPoll.pollname }, function(
    err,
    result
  ) {
    console.log(result, result.length)
    if (err) {
      return console.error(err)
    } else if (result.length !== 0) {
      return res.json({
        success: false,
        message: 'This poll name is already used'
      })
    } else {
      newPoll.link = `${home}polls/${newPoll.author}-${newPoll.pollname}/`

      //create votes Array
      const votes = newPoll.answers.map(elem => {
        return {
          option: elem,
          num: 0
        }
      })
      newPoll.votes = votes

      const currPoll = new Poll({
        pollname: newPoll.pollname,
        author: newPoll.author,
        question: newPoll.question,
        answers: newPoll.answers,
        link: newPoll.link,
        votes: newPoll.votes
      })

      currPoll.save(function(err, poll) {
        if (err) return console.error(err)
        return res.json({ success: true, poll })
      })
    }
  })
})

// delete poll
router.post('/deletePoll', function(req, res) {
  const id = req.body._id
  const author = req.body.author
  // find poll by id and remove
  Poll.remove({ _id: id }, function(err) {
    if (err) return console.error(err)
    Poll.find({ author: author }, function(err, result) {
      if (err) return console.error(err)
      res.json(result)
    })
  })
})

// change PASSWORD
router.post('/changePassword', function(req, res) {
  const validationResult = validatePasswordForm(req.body)
  if (!validationResult.success) {
    return res.json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  const userId = res.locals.userId
  const oldPass = req.body.oldPassword.trim()
  const newPass = req.body.newPassword.trim()
  const hashNew = bcrypt.hashSync(newPass, bcrypt.genSaltSync(8), null)

  User.findById(userId, function(userErr, user) {
    if (userErr || !user) {
      return res.json({
        success: false,
        message: 'Error. Password is not changed'
      })
    }
    if (!user.validPassword(oldPass)) {
      return res.json({
        success: false,
        message: 'Old password is incorrect',
        errors: { oldPassword: 'Password does not match' }
      })
    }
    User.update({ _id: userId }, { password: hashNew }, function(err) {
      if (err) return console.error(err)
      return res.json({
        success: true,
        message: 'Password is changed successfully'
      })
    })
  })
})

// GET -----------------------------------------------------------
//get user's polls
router.get('/:user/getpolls', function(req, res) {
  const user = req.params.user
  Poll.find({ author: user }, function(err, result) {
    if (err) return console.error(err)
    res.json(result)
  })
})

module.exports = router
