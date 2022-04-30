const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User');

const orderSchema = new Schema({
  items: [],
  userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
  }
})

module.exports = mongoose.model("Order", orderSchema);