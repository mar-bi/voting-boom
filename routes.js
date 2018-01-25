'use strict'

var mongoose = require('mongoose');
var Poll = require('./app/models/poll.js');
const validator = require('validator');

module.exports = function(app, passport) {
  //-------------------------------POST REQUESTS-------------------

  // LOGIN ==============================================
  // process the login form
  app.post('/login', function(req, res, next) {
    // passport.authenticate('local-login', function(err, user, info) {
    //   if (err) {
    //     return next(err)
    //     console.log("error")
    //   }
    //   if (!user) {
    //     return res.redirect('/login')
    //   }
    //   req.logIn(user, function(err) {
    //     if (err) {
    //       return next(err)
    //     }
    //     return res.redirect('/user/' + user.username)
    //   })
    // })(req, res, next)
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
    return res.json({
      success: true,
      path: `/user/${req.body.email}` //change it later
    });
  })

  // SIGNUP ==============================
  app.post('/signup', function(req, res, next) {
    // passport.authenticate('local-signup', function(err, user, info) {
    //   if (err) {
    //     console.log("error")
    //     return next(err)
    //   }
    //   if (!user) {
    //     console.log("back to signup")
    //     return res.json({ path: '/signup' })
    //   }
    //   req.logIn(user, function(err) {
    //     if (err) {
    //       return next(err)
    //     }
    //     //console.log(user)
    //     return res.json({ path: `/user/${user.email}` })
    //   })
    // })(req, res, next)
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
    return res.json({
      success: true,
      path: `/user/${req.body.name}`
    });
  });

  //PROTECTED --------------------------------------------------
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

  // NOTPROTECTED -------------------------------------------------
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

  //---------------------------------GET REQUESTS--------------------

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  // using DB / NOTPROTECTED
  // GET all polls ---------------------------------------------------
  app.get('/api/getpolls', function(req, res) {
    Poll.find({}, function(err, result){
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
    Poll.findOne({ pollname: name })
    .select({votes:1, _id:0}).exec(function(err, result) {
      if (err) return console.error(err);
      res.json(result);
    });
  });

  // using DB / PROTECTED
  //---------------------------------------------------------
  //get user's polls
  app.get('/api/:user/getpolls', function(req, res) {
    const user = req.params.user
    Poll.find({ author: user }, function(err, result) {
      if (err) return console.error(err);
      res.json(result);
    });
  });


  //--------------------------------GET APP-----------------------------

  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../dist/index.html'))
  // })
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()

  // if they aren't redirect them to the home page
  res.redirect('/')
}

// @param {object} payload - the HTTP body message
// @returns {object} The result of validation. Object contains a boolean
// validation result, errors tips, and a global message for the whole form.

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
    isFormValid = false;
    errors.password = 'Password must have at least 4 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}
