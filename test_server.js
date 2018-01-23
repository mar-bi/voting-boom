var express = require("express");
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var configDB = require('./app/config/database.js');
var Poll = require('./app/models/poll.js');
const options = {
  useMongoClient: true,
  autoIndex: false
};
mongoose.connect(configDB.url, options);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using DB
// GET all polls ---------------------------------------------------
app.get('/api/getpolls', function(req, res) {
  Poll.find({}, function(err, result){
    if (err) return console.error(err);
    res.json(result);
  });
});

//get uer's polls
app.get('/api/:user/getpolls', function(req, res) {
  const user = req.params.user
  Poll.find({ author: user }, function(err, result) {
    if (err) return console.error(err);
    res.json(result);
  });
});

//get single poll
app.get('/api/getpoll/:pollId', function(req, res) {
  const name = req.params.pollId;
  Poll.find({ pollname: name }, function(err, result) {
    if (err) return console.error(err);
    res.json(result[0]);
  });
});

//get poll results
app.get('/api/getresults/:pollId', function(req, res) {
  const name = req.params.pollId;
  Poll.findOne({ pollname: name }).select({votes:1, _id:0}).exec(function(err, result) {
    if (err) return console.error(err);
    res.json(result);
  });
});

// POST-------------------------------------------------------------
// create poll
app.post('/api/addPoll', function(req, res) {
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
app.post('/api/deletePoll', function (req, res) {
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

//add votes
app.post('/api/addVote', function(req, res) {
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



var port = 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
