const config = require('./config')
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser")
const mongoose = require('mongoose');

const subscriptionsRoute = require('./src/controllers/subscriptions.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes definition
app.use('/subscriptions', subscriptionsRoute);

// DB connection
mongoose.connect(config.mongodb_url)

app.listen(config.port, function () {
  console.log("Node server running on http://localhost:3000");
});
