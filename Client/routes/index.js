var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //Add check to see if we're already logged in. Probably using cookies
  res.redirect("login")
});

module.exports = router;
