const config = require('./config')
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser")

const subscriptionsRoute = require('./src/controllers/subscriptions.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/subscriptions', subscriptionsRoute);

app.listen(config.port, function () {
  console.log("Node server running on http://localhost:3000");
});
