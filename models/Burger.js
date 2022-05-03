const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const burgerSchema = new Schema({
  bunType: String,
  pattyType: String,
  cheeseType: String,
})

module.exports = mongoose.model("Burger", burgerSchema);