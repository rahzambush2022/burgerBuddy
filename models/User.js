const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT; //10
const validator = require('express-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
    // minLength: [4, "Username should be at least 4 characters"], 
    // maxLength: [20, "Username should not have more than 20 characters"],
    // match: [/^[\w+\d+/]*/, "Please fill with English letters or digits"]
  },
  password: {
    type: String,
    required: true,
    // minLength: [4, "Username should be at least 4 characters"], 
    // maxLength: [20, "Username should not have more than 20 characters"],
    // match: [/^[\w+\d+/]*/, "Please fill with English letters or digits"]
  },
  firstname: {
    type: String,
    required: true,
    // unique: true,
    // minLength: [2, "Username should be at least 4 characters"], 
    // maxLength: [20, "Username should not have more than 20 characters"],
    // match: [/^[\w+\d+/]*/, "Please fill with English letters or digits"]
  },
  lastname: {
    type: String,
    required: true,
    // unique: true,
    // minLength: [2, "Username should be at least 4 characters"], 
    // maxLength: [20, "Username should not have more than 20 characters"],
    // match: [/^[\w+\d+/]*/, "Please fill with English letters or digits"]
  },
  rewardPoints: {
    type: Number,
  }
})

userSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
   
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema)