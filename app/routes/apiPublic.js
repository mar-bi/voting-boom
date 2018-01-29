var express = require('express')
var router = express.Router()
var Poll = require('../models/poll.js')

//add votes
router.post('/addVote', function(req, res) {
  const vote = req.body;
  const query = {"_id": vote._id, "votes.option": vote.option };
  Poll.findOneAndUpdate(query,
    {$inc: {"votes.$.num": 1}},
    {new: true, upsert: true},
    function (err, data) {
    if (err) return console.error(err);
    //res.send('the vote is recordered');
    res.json(data);
  });
});

// GET all polls ---------------------------------------------------
router.get('/getpolls', function(req, res) {
  Poll.find({}, function(err, result){
    if (err) return console.error(err);
    res.json(result);
  });
});

//get single poll
router.get('/getpoll/:pollId', function(req, res) {
  const name = req.params.pollId;
  Poll.find({ pollname: name }, function(err, result) {
    if (err) return console.error(err);
    res.json(result[0]);
  });
});

//get poll results
router.get('/getresults/:pollId', function(req, res) {
  const name = req.params.pollId;
  Poll.findOne({ pollname: name })
  .select({votes:1, _id:0}).exec(function(err, result) {
    if (err) return console.error(err);
    res.json(result);
  });
});


module.exports = router;
