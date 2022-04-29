const bcrypt = require('bcrypt')
const User = require('../models/User')
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken')
const verifyUser = require('../middleware/verifyUser')

async function verifyToken(req, res, next) {
  let { username, password } = req.body
  let token;
  console.log("req.body: ", req.body);

  try {
    if (!username || !password ) {
      return res.render("login", {message: "Please complete form"})
    }

    let user;
    user = await User.findOne({username: username})
    // console.log(user);
    if (!user) {
      return res.render("login", {message: "Username not found!"})
    }
    let passwordMatch;
    passwordMatch = await bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      return res.render("login", {message: "Password not a match!"})
    }
    // console.log("Found user and signed in!");
    token = jwt.sign({id: user._id, role: "user"}, secret)
    res.cookie("tokenLogin", token)
    console.log({token, user: {id: user._id, username: username}});

  } catch (error) {
    res.status(500).json({error: error.message})
  }
  req.loggedIn = token;
  next()
}

module.exports = verifyToken;