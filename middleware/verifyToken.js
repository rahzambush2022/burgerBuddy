const bcrypt = require("bcrypt");
const User = require("../models/User");
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verifyUser");
const session = require("express-session");

async function verifyToken(req, res, next) {
  let { username, password } = req.body;
  let token;
  console.log("req.body: ", req.body);

  const user = await User.findOne({ username: username }).lean();
  
  try {
    if (!username || !password) {
      return res.render("login", { message: "Please complete form" });
    }

    let user;
    user = await User.findOne({ username: username });
    if (!user) {
      return res.render("login", { message: "Username not found!" });
    }
    let passwordMatch;
    passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.render("login", { message: "Password not a match!" });
    }
    token = jwt.sign({ id: user._id, role: "user" }, secret);
    res.cookie("tokenLogin", token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  req.loggedIn = token;
  next();
}

module.exports = verifyToken;
