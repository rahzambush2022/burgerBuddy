const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  drinkName: String,
  drinkPrice: Number,
})

module.exports = mongoose.model("Drink", drinkSchema);