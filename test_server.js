var express = require("express");
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport'); //create passport object
var flash = require('connect-flash');


var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var routes = require('./routes.js');
var configDB = require('./app/config/database.js');
var Poll = require('./app/models/poll.js');
const options = {
  useMongoClient: true,
  autoIndex: false
};

mongoose.connect(configDB.url, options);
require('./app/config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// required for passport-------------------------------------------
app.use(session({ secret: 'sleepy unicorn' })) // session secret???
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

routes(app, passport);


// // using DB
// // GET all polls ---------------------------------------------------
// app.get('/api/getpolls', function(req, res) {
//   Poll.find({}, function(err, result){
//     if (err) return console.error(err);
//     res.json(result);
//   });
// });
//
// //get user's polls
// app.get('/api/:user/getpolls', function(req, res) {
//   const user = req.params.user
//   Poll.find({ author: user }, function(err, result) {
//     if (err) return console.error(err);
//     res.json(result);
//   });
// });
//
// //get single poll
// app.get('/api/getpoll/:pollId', function(req, res) {
//   const name = req.params.pollId;
//   Poll.find({ pollname: name }, function(err, result) {
//     if (err) return console.error(err);
//     res.json(result[0]);
//   });
// });
//
// //get poll results
// app.get('/api/getresults/:pollId', function(req, res) {
//   const name = req.params.pollId;
//   Poll.findOne({ pollname: name }).select({votes:1, _id:0}).exec(function(err, result) {
//     if (err) return console.error(err);
//     res.json(result);
//   });
// });
//
// // POST-------------------------------------------------------------
// // create poll
// app.post('/api/addPoll', function(req, res) {
//   const newPoll = req.body;
//   // create votes Array
//   const votes = newPoll.answers.map((elem, index) => {
//       return {
//         option: elem,
//         num: 0
//       }
//   });
//   const currPoll = new Poll({
//     pollname: newPoll.pollname,
//     author: newPoll.author,
//     question: newPoll.question,
//     answers: newPoll.answers,
//     link: newPoll.link,
//     votes: votes
//   });
//   currPoll.save(function (err, poll) {
//     if (err) return console.error(err);
//     res.json(poll);
//   });
// });
//
// // delete poll
// app.post('/api/deletePoll', function (req, res) {
//   const id = req.body._id;
//   const author = req.body.author;
//
//   Poll.remove({_id: id}, function (err, poll) {
//     if (err) return console.error(err);
//     Poll.find({ author: author }, function(err, result) {
//       if (err) return console.error(err);
//       res.json(result);
//     });
//   });
// });
//
// //add votes
// app.post('/api/addVote', function(req, res) {
//   const vote = req.body;
//   const query = {"_id": vote._id, "votes.option": vote.option };
//   Poll.findOneAndUpdate(query,
//     {$inc: {"votes.$.num": 1}},
//     {new: true, upsert: true},
//     function (err, data) {
//     if (err) return console.error(err);
//     //res.send('the vote is recordered');
//     res.json(data);
//   });
// });



var port = 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
