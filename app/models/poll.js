// poll model
var mongoose = require('mongoose');

// define the schema for the poll model
var pollSchema = mongoose.Schema({
  pollname: String,
  author: String,
  question: String,
  answers: [String],
  link: String
});

var pollResults = mongoose.Schema({
  poll: ''
});
