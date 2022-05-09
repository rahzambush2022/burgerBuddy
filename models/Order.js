const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User');

const orderSchema = new Schema({
  bunType: String,
  bunPrice: Number,
  pattyType: String,
  pattyPrice: Number,
  cheeseName: String,
  cheesePrice: Number,
  firstTopping: String,
  firstToppingPrice: Number,
  secondTopping: String,
  secondToppingPrice: Number,
  thirdTopping: String,
  thirdToppingPrice: Number,
  fourthTopping: String,
  fourthToppingPrice: Number,
  sideName: String,
  sidePrice: Number,
  drinkName: String,
  drinkPrice: Number,
  subTotal: Number,
  userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
  }
})

module.exports = mongoose.model("Order", orderSchema);