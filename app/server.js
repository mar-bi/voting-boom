'use strict';

var express = require("express");
var path = require('path');
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('./routes.js'));

// ---------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
