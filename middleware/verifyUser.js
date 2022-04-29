const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
// const Cube = require("../models/Cube");

const verifyUser = function verifyUser(req, res, next) {

  // console.log("The middleware function has been called");
  let userLoggedIn;
  if (!req.cookies.tokenLogin) {
    userLoggedIn = false;
    req.loggedIn = false;
    next();
  } else {
    userLoggedIn = jwt.verify(req.cookies.tokenLogin, secret);
    console.log("Role is ", userLoggedIn.role);
    if (!userLoggedIn) {
      req.loggedIn = false;
      next();
    } else {
      req.loggedIn = true;
      next(); // continue with normal response...
    }
  }
  //if user logged in 
}

module.exports = verifyUser;