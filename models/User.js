const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [4, "Username should be at least 4 characters"], 
    maxLength: [20, "Username should not have more than 20 characters"],
    match: [/^[\w+\d+/]*/, "Please fill with English letters or digits"]
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "Username should be at least 4 characters"], 
    maxLength: [20, "Username should not have more than 20 characters"],
    // match: [/^[\w+\d+/]*/, "Please fill with English letters or digits"]
  },
  rewardPoints: {
    type: Number,
  }
})

module.exports = mongoose.model("User", userSchema)