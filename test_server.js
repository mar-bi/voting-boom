var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')
var passport = require('passport') //create passport object

var morgan = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()
require('dotenv').config()

var configDB = process.env.LOCAL_MONGODB
//var Poll = require('./app/models/poll.js')
//var User = require('./app/models/user.js')

mongoose.connect(configDB, {
  useMongoClient: true,
  autoIndex: false
})
require('./app/config/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// required for passport-------------------------------------------
app.use(passport.initialize())

// pass the authenticaion checker middleware--------------------------
const authCheckMiddleware = require('./app/auth-check')
app.use('/api/private', authCheckMiddleware)

// routes --------------------------------------------------------------
var authRoutes = require('./app/routes/auth')
var apiPublicRoutes = require('./app/routes/apiPublic')
var apiPrivateRoutes = require('./app/routes/apiPrivate')
app.use('/auth', authRoutes)
app.use('/api/public', apiPublicRoutes)
app.use('/api/private', apiPrivateRoutes)


var port = 3000
app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...')
})
