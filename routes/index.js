var express = require("express");
var router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const session = require("express-session");

/* GET home page. */

router.get("/", verifyUser, function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  if (res.loggedIn === true) {
    res.render("index", { loggedIn, initials });
  } else {
    res.render("index");
  }
});

module.exports = router;
