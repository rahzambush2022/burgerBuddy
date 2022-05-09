const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");
const Admin = require("../models/Admin");
const expressValidator = require("express-validator");
const verifyUser = require("../middleware/verifyUser");
const verifyToken = require("../middleware/verifyToken");
const session = require("express-session");

router.get("/adminRegister", function (req, res, next) {
  res.render("adminRegister");
});

router.post("/adminRegister", async function (req, res, next) {
  const { username, password, repeatPassword } = req.body;
  let duplicate = await Admin.findOne({ username: username });
  if (duplicate) {
    req
      .checkBody("username", "Username already exists")
      .not.equals(duplicate.username);
  }
  req.checkBody("username", "Username is required").not().isEmpty();
  req
    .checkBody("username", "Username can only contain letter and numbers")
    .isAlphanumeric();
  req
    .checkBody("username", "Username must be between 4 and 20 characters")
    .isLength({ min: 4, max: 20 });
  req.checkBody("password", "Password is required").not().isEmpty();
  req
    .checkBody("password", "Password can only contain letter and numbers")
    .isAlphanumeric();
  req
    .checkBody("password", "Password must be between 4 and 20 characters")
    .isLength({ min: 4, max: 20 });
  req.checkBody("repeatPassword", "Passwords do not match").equals(password);
  const errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.render("adminRegister", {
      success: req.session.success,
      errors: req.session.errors,
    });
  } else {
    req.session.success = true;
    const newAdmin = new Admin({ username: username, password: password });
    await newAdmin.save();
    res.redirect("/");
  }
});

router.get("/adminLogin", function (req, res, next) {
  res.render("adminLogin");
});

router.post("/adminLogin", async function (req, res, next) {
  res.render("adminLogin");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", async function (req, res, next) {
  const { username, password, repeatPassword, firstname, lastname } = req.body;
  let duplicate = await User.findOne({ username: username });
  if (duplicate) {
    req
      .checkBody("username", "Username already exists")
      .not()
      .equals(duplicate.username);
  }
  req.checkBody("username", "Username is required").not().isEmpty();
  req
    .checkBody("username", "Username can only contain letter and numbers")
    .isAlphanumeric();
  req
    .checkBody("username", "Username must be between 4 and 20 characters")
    .isLength({ min: 4, max: 20 });
  req.checkBody("password", "Password is required").not().isEmpty();
  req
    .checkBody("password", "Password can only contain letter and numbers")
    .isAlphanumeric();
  req
    .checkBody("password", "Password must be between 4 and 20 characters")
    .isLength({ min: 4, max: 20 });
  req.checkBody("repeatPassword", "Passwords do not match").equals(password);
  req.checkBody("firstname", "First name is required").not().isEmpty();
  req
    .checkBody("firstname", "First name can only contain letter and numbers")
    .isAlphanumeric();
  req
    .checkBody("firstname", "First name must be between 4 and 20 characters")
    .isLength({ min: 2, max: 20 });
  req.checkBody("lastname", "Last name is required").not().isEmpty();
  req
    .checkBody("lastname", "Last name can only contain letter and numbers")
    .isAlphanumeric();
  req
    .checkBody("lastname", "Last name must be between 4 and 20 characters")
    .isLength({ min: 2, max: 20 });
  const errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.render("register", {
      success: req.session.success,
      errors: req.session.errors,
    });
  } else {
    req.session.success = true;
    const newUser = new User({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      rewardPoints: 0,
    });
    await newUser.save();
    res.redirect("/");
  }
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", verifyToken, verifyUser, async function (req, res, next) {
  res.redirect("/");
});

router.get("/logout", async function (req, res, next) {
  await res.clearCookie("tokenLogin");
  await Order.deleteMany({});
  console.log("Token cleared");
  res.redirect("/");
});

module.exports = router;
