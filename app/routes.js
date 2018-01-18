'use strict'
var data = require('./utils/data.json')

module.exports = function (app, passport) {
//-------------------------------POST-------------------

  // LOGIN ==============================================
  // process the login form
  app.post('/login', function(req, res, next) {
    // go to username
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/user/' + user.username);
      });
    }) (req, res, next);
  });

  // SIGNUP ==============================
  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/signup'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/user/' + user.username);
      });
    }) (req, res, next);
  });

  //receive new poll data - PROTECTED
  app.post('/addPoll', isLoggedIn, function(req, res) {
    var new_poll = req.body
    console.log(new_poll.data)
    res.json(new_poll.data)
  })

  //receive voting data NOT PROTECTED
  app.post('/addVote', function(req, res) {
    var new_vote = req.body
    console.log(new_vote)
    res.json(new_vote.data)
  })

  //---------------------------------GET / Data Load--------------------

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/api/getpolls', function(req, res) {
    res.json(data)
  })

  // PROTECTED
  app.get('/api/:user/getpolls', isLoggedIn, function(req, res) {
    const user = req.params.user
    const userPolls = data.polls.filter((poll) => poll.author === user)
    res.json({ polls: userPolls })
  })


  app.get('/api/getpoll/:pollId', function(req, res) {
    const name = req.params.pollId;
    const singlePoll = data.polls.filter((poll) => poll.pollname === name)
    res.json(singlePoll[0]);
  })

  //--------------------------------GET APP-----------------------------

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



/*  routes
GET
- /api/getpolls - get all polls, connction to DB
- /api/:user/getpolls - get userpolls, connection to DB
- /api/getpoll/:pollId - get a single poll

- / and *       - HomePage / make it last one

POST
- /login
- /signup
???- /facebook --- later
- /addPoll
- /addVote

*/
