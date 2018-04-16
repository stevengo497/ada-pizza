/* setting up router */
const express = require('express');
const indexRoute = express.Router();

indexRoute.get('/', function(req, res) {
  res.render('index', {
    //       | fill in this object!
    //       V   what should it have?? Maybe run `npm jest` and find out :)
    data: 'goes here'
  });
});

module.exports = indexRoute;