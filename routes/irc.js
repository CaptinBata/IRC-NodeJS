const express = require('express');
const MessageStructure = require('../public/javascripts/messageStructure');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('irc', {
    "messagesList": req.messagesList,
  });
});

router.post('/sendmessage', function (req, res, next) {
  let message = req.body.message;
  req.messagesList.push(new MessageStructure(new Date(Date.now()), message, req.username, "#test-channel").getMessage())
  req.ircClient.say("#test-channel", message)
  res.redirect('/irc')
});

module.exports = router;
