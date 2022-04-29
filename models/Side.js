const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sideSchema = new Schema({
  sideName: String,
  sidePrice: Number,
})

module.exports = mongoose.model("Side", sideSchema);