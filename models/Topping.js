const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
  toppingType: String,
  toppingPrice: Number,
  burgers: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Burger',
    },
  ],
})

module.exports = mongoose.model("Topping", toppingSchema);