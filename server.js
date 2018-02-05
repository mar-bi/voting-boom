'use strict'

var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var cors = require('cors')
var passport = require('passport')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()
require('dotenv').config()

app.set('port', (process.env.PORT || 5000))

var configDB = process.env.MONGOLAB_URI

mongoose.connect(configDB, {
  useMongoClient: true,
  autoIndex: false
})
mongoose.Promise = global.Promise
require('./app/config/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static(path.join(__dirname, './dist')))

// required for passport--------------------------------------------
app.use(passport.initialize())

// pass the authenticaion checker middleware------------------------
const authCheckMiddleware = require('./app/utils/auth-check')
app.use('/api/private', authCheckMiddleware)

// routes-----------------------------------------------------------
var authRoutes = require('./app/routes/auth')
var apiPublicRoutes = require('./app/routes/apiPublic')
var apiPrivateRoutes = require('./app/routes/apiPrivate')
app.use('/auth', authRoutes)
app.use('/api/public', apiPublicRoutes)
app.use('/api/private', apiPrivateRoutes)

app.get('/*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// launch ----------------------------------------------------------
app.listen(app.get('port'),  function () {
  console.log('Node app is running on port', app.get('port'))
})
