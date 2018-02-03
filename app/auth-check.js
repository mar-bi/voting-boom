const jwt = require('jsonwebtoken')
var User = require('./models/user.js')

require('dotenv').config()
const secret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return jwt.verify(token, secret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      console.log("auth error")
      return res.status(401).end()
    }

    const userId = decoded.sub

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        console.log("no user")
        return res.status(401).end()
      }
      res.locals.userId = userId
      console.log("auth success")
      return next()
    })
  })
}
