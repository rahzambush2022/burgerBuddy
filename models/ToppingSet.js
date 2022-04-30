const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const toppingSetSchema = new Schema({
  firstTopping: String,
  secondTopping: String,
  thirdTopping: String,
  fourthTopping: String,
  burgerID: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Burger',
    },
  ],
})

module.exports = mongoose.model("ToppingSet", toppingSetSchema);