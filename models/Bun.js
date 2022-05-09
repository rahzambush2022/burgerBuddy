const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bunSchema = new Schema({
  bunType: String,
  bunPrice: Number,
})

module.exports = mongoose.model("Bun", bunSchema);