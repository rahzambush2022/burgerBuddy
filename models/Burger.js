const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const burgerSchema = new Schema({
  bunType: String,
  pattyType: String,
  basePrice: Number,
  toppings: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Topping',
    },
  ],
})

module.exports = mongoose.model("Burger", burgerSchema);