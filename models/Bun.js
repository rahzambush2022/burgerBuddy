const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bunSchema = new Schema({
  bunName: String,
  bunPrice: Number,
})

module.exports = mongoose.model("Bun", bunSchema);