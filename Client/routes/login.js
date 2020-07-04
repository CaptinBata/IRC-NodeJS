const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function (req, res, next) {
  res.render('login', {
    "failed": false,
  });
});

router.post('/authenticate', async function (req, res, next) {
  let txtUserName = req.body.username;
  let txtPassword = req.body.password;

  let result = await req.ircClient.authorise({ "username": txtUserName, "password": txtPassword })

  result == 0 ? res.redirect("/irc") : res.render('login', { "failed": true });
  //If result is 0 (Authenticated), then go to irc page, else go back to login. More checks can be placed here in the future for logging, and other return codes

});


module.exports = router;
