'use strict'
//set up-------------------------------------------------------

var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var cors = require('cors')
var passport = require('passport') //create passport object
//var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
//var session = require('express-session')

var app = express()
require('dotenv').config()

var configDB = process.env.LOCAL_MONGODB
var options = {
  useMongoClient: true,
  autoIndex: false
}

//configuration-----------------------------------------
mongoose.connect(configDB.url, options)
require('./config/passport')(passport)

// set up an express app
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static(path.join(__dirname, '../dist')))

// required for passport-------------------------------------------
app.use(passport.initialize())
//app.use(flash())

// pass the authenticaion checker middleware--------------------------
const authCheckMiddleware = require('./auth-check')
app.use('/api/private', authCheckMiddleware)

// routes --------------------------------------------------------------
var authRoutes = require('./routes/auth')
var apiPublicRoutes = require('./routes/apiPublic')
var apiPrivateRoutes = require('./routes/apiPrivate')
app.use('/auth', authRoutes)
app.use('/api/public', apiPublicRoutes)
app.use('/api/private', apiPrivateRoutes)

// launch ---------------------------------------------
var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('Node.js listening on port ' + port + '...')
})
