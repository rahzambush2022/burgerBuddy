const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cheeseSchema = new Schema({
  cheeseName: String,
  cheesePrice: Number,
})

module.exports = mongoose.model("Cheese", cheeseSchema);