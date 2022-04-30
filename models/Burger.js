const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const burgerSchema = new Schema({
  bunType: String,
  pattyType: String,
  cheeseType: String,
  toppings: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ToppingSet',
    },
  ],
})

module.exports = mongoose.model("Burger", burgerSchema);