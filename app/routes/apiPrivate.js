var express = require('express')
var router = express.Router()
var Poll = require('../models/poll.js')

//PROTECTED POST--------------------------------------------------
// create poll
router.post('/addPoll', function(req, res) {
  const newPoll = req.body;
  // create votes Array
  const votes = newPoll.answers.map((elem, index) => {
      return {
        option: elem,
        num: 0
      }
  });
  const currPoll = new Poll({
    pollname: newPoll.pollname,
    author: newPoll.author,
    question: newPoll.question,
    answers: newPoll.answers,
    link: newPoll.link,
    votes: votes
  });
  currPoll.save(function (err, poll) {
    if (err) return console.error(err);
    res.json(poll);
  });
});

// delete poll
router.post('/deletePoll', function (req, res) {
  const id = req.body._id;
  const author = req.body.author;

  Poll.remove({_id: id}, function (err, poll) {
    if (err) return console.error(err);
    Poll.find({ author: author }, function(err, result) {
      if (err) return console.error(err);
      res.json(result);
    });
  });
});

// GET -----------------------------------------------------------
//get user's polls
router.get('/:user/getpolls', function(req, res) {
  const user = req.params.user
  Poll.find({ author: user }, function(err, result) {
    if (err) return console.error(err);
    res.json(result);
  });
});

module.exports = router;
