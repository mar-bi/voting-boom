var express = require("express");
var data = require('./app/utils/data.json');
var cors = require('cors');


var app = express();
app.use(cors());

app.get('/api/getpolls', function(req, res) {
  console.log(data);
  res.json(data);
})

// mistake in route???
app.get('/api/:user/getpolls', function(req, res) {
  const user = req.params.user
  const userPolls = data.polls.filter((poll) => poll.author === user)
  res.json({ polls: userPolls });
})

var port = 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
