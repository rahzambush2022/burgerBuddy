const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
  toppingType: String,
  toppingPrice: Number,
})

module.exports = mongoose.model("Topping", toppingSchema);