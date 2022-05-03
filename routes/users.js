const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Topping = require('../models/Topping');
const Burger = require('../models/Burger');
const ToppingSet = require('../models/ToppingSet');
const Drink = require('../models/Drink');
const Side = require('../models/Side');
const Patty = require('../models/Patty');
const Cheese = require('../models/Cheese');
const Bun = require('../models/Bun');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET users/adminLogin listing. */
router.get('/adminLogin', function(req, res, next) {
  res.render('adminLogin');
});

module.exports = router;

/* GET users/login listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET users/order listing. */
router.get('/order', async function(req, res, next) {
  const toppings = await Topping.find({});
  const drinks = await Drink.find({});
  const sides = await Side.find({});
  const cheeses = await Cheese.find({});
  const patties = await Patty.find({});
  const buns = await Bun.find({});
  // console.log("buns: ", buns);

  res.render('order', {toppings, drinks, sides, cheeses, patties, buns});
});

/* GET users/order listing. */
router.post('/order', async function(req, res, next) {
  const { bunType, pattyType, cheeseType, firstTopping, secondTopping, thirdTopping, fourthTopping, sideName, drinkName, quantity } = req.body;
  for(let i = 0; i < +quantity; i++){
  const newOrder = new Order ({item: []});
  const newBurger = new Burger({
    bunType: bunType,
    pattyType: pattyType,
    cheeseType: cheeseType
  });
  const newToppingSet = new ToppingSet({
    firstTopping: firstTopping,
    secondTopping: secondTopping,
    thirdTopping: thirdTopping,
    fourthTopping: fourthTopping
  });
  const newSide = new Side({
     sideName: sideName
  });
  const newDrink = new Drink({
    drinkName: drinkName
 });
  // console.log('bunType is '+ newBurger.bunType);
  // console.log('drink is '+ newDrink)
  // console.log('side is '+ newSide);
  // console.log('burger is ' + newBurger);
  // console.log('toppingSet is ' + newToppingSet);
  console.log(quantity);

  newOrder.items.push(newBurger);
  newOrder.items.push(newToppingSet);
  newOrder.items.push(newSide);
  newOrder.items.push(newDrink);
  console.log('order is ' + newOrder);
  
  await newOrder.save();
  }

  res.render('order');
}); 

module.exports = router;
