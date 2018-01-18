// poll model
var mongoose = require('mongoose');

// define the schema for the poll model
var pollSchema = mongoose.Schema({
  pollname: String,
  author: String,
  question: String,
  answers: [String],
  link: String,
  votes: [{
    option: String,
    num: Number
  }]
});

// create the poll model
module.exports = mongoose.model('Poll', pollSchema);
