var express = require('express');
const messageStructure = require('../public/javascripts/messageStructure');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.count = req.count + 1;
  req.messagesList.push(new messageStructure(new Date(Date.now()), `Message ${req.count}`, "Nyk", "Someone").getMessage())
  res.render('irc', {
    "messagesList": req.messagesList
  });
});

module.exports = router;
