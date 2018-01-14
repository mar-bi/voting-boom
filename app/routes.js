//'use strict'
var path = require('path')
var express = require('express')
var router = express.Router()
var data = require('./utils/data.json')

//-------------------------------POST-------------------
//receive login form data
router.post('/login', function(req, res, next) {
  var login_data = req.body
  console.log('Hello')
  console.log(login_data.data)
  res.json(login_data.data)
})

//receive signup form data
router.post('/signup', function(req, res) {
  var signup_data = req.body
  console.log(signup_data)
  res.json(signup_data.data)
})

//receive new poll data
router.post('/addPoll', function(req, res) {
  var new_poll = req.body
  console.log(new_poll.data)
  res.json(new_poll.data)
})

//receive voting data
router.post('/addVote', function(req, res) {
  var new_vote = req.body
  console.log(new_vote)
  res.json(new_vote.data)
})

//---------------------------------GET / Data Load--------------------

router.get('/api/getpolls', function(req, res) {
  res.json(data)
})

// mistake in route???
router.get('/api/:user/getpolls', function(req, res) {
  const user = req.params.user
  const userPolls = data.polls.filter((poll) => poll.author === user)
  res.json({ polls: userPolls })
})

router.get('/api/getpoll/:pollId', function(req, res) {
  const name = req.params.pollId;
  //console.log(name);
  const singlePoll = data.polls.filter((poll) => poll.pollname === name)
  res.json(singlePoll[0]);
})

//--------------------------------GET APP-----------------------------

router.get('*', function(req, res) {
  //console.log('sending app file')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

module.exports = router

/*  routes
GET
- /api/getpolls - get all polls, connction to DB
- /api/:user/getpolls - get userpolls, connection to DB
- /api/getpoll/:pollId - get a single poll

- / and *       - HomePage / make it last one

???
- /facebook - login with facebook --- later

POST
- /login
- /signup
???- /facebook --- later
- /addPoll
- /addVote

*/
