'use strict'
var path = require('path');
var express = require('express')
var router = express.Router()

router.get('*', function(req, res) {
  //console.log('sending app file')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

//-------------------------------POST-------------------
//receive login form data
router.post('/login', function(req, res, next) {
  var login_data = req.body
  //console.log(login_data.data)
  res.json(login_data.data)
})

//receive signup form data
router.post('/signup', function(req, res) {
  var signup_data = req.body
  //console.log(signup_data)
  res.json(signup_data.data)
})

//receive new poll data
router.post('/addPoll', function(req, res) {
  var new_poll = req.body
  //console.log(new_poll.data)
  res.json(new_poll.data)
})

//receive voting data
router.post('/addVote', function(req, res) {
  var new_vote = req.body
  //console.log(new_vote)
  res.json(new_vote.data)
})

//---------------------------------GET-----------------------
router.get('/api/getpolls', function(req, res) {
  // !!!FOR TESTING
  const allPolls = [
    {
      pollname: 'Favourite Drink',
      author: 'Small Panda',
      question: 'What is your favourite drink?',
      answers: ['mango juice', 'milk']
    }
  ]
  res.json(allPolls)
})

router.get('/api/getuserpolls', function(req, res) {
  // !!! FOR TESTING
  const allPolls = [
    {
      pollname: 'Favourite Drink',
      author: 'Small Panda',
      question: 'What is your favourite drink?',
      answers: ['mango juice', 'milk']
    }
  ]
  res.json(allPolls)
})

module.exports = router

/*  routes
GET
- /       - HomePage
???
- /facebook - login with facebook --- later

POST
- /login
- /signup
???- /facebook --- later
- /addPoll
- /addVote

*/
