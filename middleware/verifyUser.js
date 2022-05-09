const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const User = require('../models/User');
const session = require('express-session');



const verifyUser = async function verifyUser(req, res, next) {

  // console.log("The middleware function has been called");
  let userLoggedIn;
  let role;
  if (!req.cookies.tokenLogin) {
    userLoggedIn = false;
    req.loggedIn = false;
    next();
  } else {
    
    userLoggedIn = jwt.verify(req.cookies.tokenLogin, secret);
    if (!userLoggedIn) {
      res.loggedIn = false;

      next();
    } else {
      res.loggedIn = true;
      let user = await User.findById({_id: userLoggedIn.id});
      const firstName = user.firstname;
     	const lastName = user.lastname;
    	const fullName = firstName + " " + lastName;
    	let initials = fullName
	  	.split(' ')
	  	.map(function (s) {
	  		return s.charAt(0);
	  	})
	  	.join('');
  
    req.session.context = initials;
    req.session.userID = userLoggedIn.id
      if(userLoggedIn.role === 'user'){
        role = 'user';
        next();
      }else if(userLoggedIn.role === 'admin'){
        role = 'admin'
        next();
      }
      
    }
  }
  //if user logged in 
}

module.exports = verifyUser;