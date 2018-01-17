'use strict'
//set up-------------------------------------------------------

var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport') //create passport object
var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()
var routes = require('./routes.js')
require('dotenv').load()

var configDB = require('./config/database.js')

//configuration-----------------------------------------
mongoose.connect(configDB.url)
require('./config/passport')(passport)

// set up an express app
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static(path.join(__dirname, '../dist')))

// required for passport-------------------------------------------
app.use(session({ secret: 'sleepy unicorn' }))  // session secret???
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// routes --------------------------------------------------------------
routes(app, passport);

// launch ---------------------------------------------
var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('Node.js listening on port ' + port + '...')
})
