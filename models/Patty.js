const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pattySchema = new Schema({
  pattyName: String,
  pattyPrice: Number,
})

module.exports = mongoose.model("Patty", pattySchema);